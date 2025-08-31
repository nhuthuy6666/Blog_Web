export async function handleFollowPlus(account: IAccount | null): Promise<void> {
  if (!account) {
    console.error("No account provided to handleFollowPlus");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5001/accounts/${account.accountId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followers: (account.followers ?? 0) + 1 }),
    });

    if (!res.ok) {
      console.error("Failed to update followers");
    }
  } catch (err) {
    console.error("Error in handleFollowPlus:", err);
  }
}

export async function handleFollowSubtraction(account: IAccount | null): Promise<void> {
  if (!account) {
    console.error("No account provided to handleFollowPlus");
    return;
  }

  try {
    const newFollows = Math.max(0, account.followers - 1);
    const res = await fetch(`http://localhost:5001/accounts/${account.accountId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followers: newFollows }),
    });

    if (!res.ok) {
      console.error("Failed to update followers");
    }
  } catch (err) {
    console.error("Error in handleFollowPlus:", err);
  }
}

