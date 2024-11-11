import { NextRequest, NextResponse } from 'next/server';
import { assignFavoriteTopicsToUser } from '@/actions/assignFavoriteTopicsToUser';

export async function POST(req: Request, res: Response) {
  const data: {
    id: string;
    topics: number[];
  } = await req.json();
  if (req.method === 'POST') {
    const { id, topics } = data;
    try {
      const preferences = await assignFavoriteTopicsToUser(
        parseInt(id as string, 10),
        topics
      );
      NextResponse.json({
        status: 201,
        data: JSON.stringify(preferences),
        ok: true,
      });
    } catch (error) {
      NextResponse.json({
        status: 500,
        error: {
          message: 'Error updating favorite topics',
        },
        ok: false,
      });
      console.log(error);
    }
  } else {
    NextResponse.json({
      status: 405,
      error: {
        message: 'Method not allowed',
      },
      ok: false,
    });
  }

  return NextResponse.json(res);
}
