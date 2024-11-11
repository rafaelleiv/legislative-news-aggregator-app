import { State } from '@/prisma/interfaces';

export async function getStates(): Promise<State[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/states`, {
      cache: 'force-cache',
      next: { revalidate: 345600 }, // 4 weeks
    });

    if (!res.ok) {
      throw new Error('Failed to fetch states');
    }

    return res.json();
  } catch (err) {
    console.error(err, 'Error fetching states');

    return [];
  }
}
