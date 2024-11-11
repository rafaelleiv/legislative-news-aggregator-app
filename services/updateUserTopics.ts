export async function updateUserTopics(userId: number, topicIds: number[]) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/topics`;

    const data = {
      id: userId,
      topics: topicIds,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to update user topics');
    }

    return res.json();
  } catch (error) {
    console.error('Error updating user topics:', error);
    return null;
  }
}
