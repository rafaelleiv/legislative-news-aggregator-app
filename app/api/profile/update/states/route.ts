import { NextResponse } from 'next/server';
import { assignFavoriteStatesToUser } from '@/actions/assignFavoriteStatesToUser';

export async function POST(req: Request) {
  const data: {
    id: string;
    states: number[];
  } = await req.json();

  const { id, states } = data;
  try {
    const preferences = await assignFavoriteStatesToUser(
      parseInt(id, 10),
      states
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
