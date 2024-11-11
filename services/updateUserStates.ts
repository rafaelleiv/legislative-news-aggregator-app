export async function updateUserStates(userId: number, statesIds: number[]) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/update/states`;

    const data = {
      id: userId,
      states: statesIds,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(
        'Failed to update user states: unexpected response' +
          JSON.stringify(res)
      );
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating user states:', error);
    return null;
  }
}
