import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { assignFavoriteStatesToUser } from '@/actions/assignFavoriteStatesToUser';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const { stateIds } = req.body;
  if (req.method === 'POST') {
    try {
      await assignFavoriteStatesToUser(
        parseInt(userId as string, 10),
        stateIds
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating favorite states', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  return NextResponse.json(res);
}
