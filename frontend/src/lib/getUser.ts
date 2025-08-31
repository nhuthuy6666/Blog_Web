export function getUser(): User | null {
  if (typeof window === "undefined") return null; 
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    const parsedUser = JSON.parse(storedUser);
    return parsedUser._doc || null; 
  } catch (err) {
    console.error("Failed to parse user:", err);
    return null;
  }
}
