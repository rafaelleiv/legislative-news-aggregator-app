import { Topic } from '@/prisma/interfaces';

export async function getTopics(): Promise<Topic[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: 'force-cache',
      next: { revalidate: 86400 }, // 1 week
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (err) {
    console.error(err, 'Error fetching topics');

    return [];
  }
}
