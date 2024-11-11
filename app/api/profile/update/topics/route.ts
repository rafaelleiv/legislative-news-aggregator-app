import { NextResponse } from 'next/server';
import { assignFavoriteTopicsToUser } from '@/actions/assignFavoriteTopicsToUser';

export async function POST(req: Request) {
  const data: {
    id: string;
    topics: number[];
  } = await req.json();

  const { id, topics } = data;
  try {
    const preferences = await assignFavoriteTopicsToUser(
      parseInt(id, 10),
      topics
    );
    return NextResponse.json({
      status: 201,
      data: preferences,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      error: {
        message: 'Error updating favorite topics',
      },
      ok: false,
    });
  }
}
