export async function getUserById(id: number) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`;

    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error getting user by id:', error);
    return null;
  }
}
