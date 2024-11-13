'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { Article } from '@/prisma/interfaces';
import { toast } from '@/hooks/use-toast';

type Message = {
  topic: string;
  data: Article[];
};

interface WebSocketContextType {
  socket: Socket | null;
  messages: Message[];
  sendMessage: (topic: string, data: Article) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  topics: string[];
}> = ({ children, topics }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Request permission to show notifications
    Notification.requestPermission().then();
  }, []);

  useEffect(() => {
    // Configura y abre la conexión WebSocket solo una vez
    socketRef.current = io(
      process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001/news',
      {
        transports: ['websocket'],
      }
    );

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket');
      // Subscribe to the topics
      topics.forEach((topic) => {
        socketRef.current?.emit('subscribeToTopic', topic);
      });
    });

    socketRef.current.on('newArticle', (incomingMessage: Message) => {
      console.log('New article received:', incomingMessage);

      // Check if we are on the root page ("/")
      const currentPath = window.location.pathname;
      if (currentPath === '/') {
        // Update messages only if on the root page
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.map((msg) =>
            msg.topic === incomingMessage.topic
              ? {
                  ...msg,
                  data: [
                    ...incomingMessage.data.filter(
                      (article) =>
                        !msg.data.some((existing) => existing.id === article.id)
                    ),
                    ...msg.data,
                  ],
                }
              : msg
          );

          if (
            !updatedMessages.some((msg) => msg.topic === incomingMessage.topic)
          ) {
            updatedMessages.push(incomingMessage);
          }

          return updatedMessages;
        });
      } else {
        // Show toast notification if not on the root page
        toast({
          title: 'New articles available!',
          description: 'New articles have been published, check them out!',
        });

        if (
          document.visibilityState !== 'visible' &&
          Notification.permission === 'granted'
        ) {
          console.log('Showing notification globally');
          if (Notification.permission === 'granted') {
            new Notification('New articles available!', {
              body: `Check the latest articles in the ${incomingMessage.topic} topic.`,
              icon: '/icon.png',
            });
          }
        }
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return () => {
      // Opcionalmente, puedes cerrar la conexión si lo deseas
      socketRef.current?.disconnect();
    };
  }, [topics]);

  const sendMessage = (topic: string, data: Article) => {
    socketRef.current?.emit(topic, data);
  };

  return (
    <WebSocketContext.Provider
      value={{ socket: socketRef.current, messages, sendMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use the WebSocket context
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider'
    );
  }
  return context;
};
