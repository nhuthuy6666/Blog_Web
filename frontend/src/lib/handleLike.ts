export async function handleLikePlus(blog: IBlog, currentLikes: number): Promise<void>{
    try {
      const res = await fetch(`http://localhost:5001/blogs/${blog.blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: currentLikes + 1 }),
      });

      if (!res.ok) {
        console.error("Failed to update likes");
      }
    } catch (err) {
      console.error(err);
    }
}

export async function handleLikeSubtraction(blog: IBlog): Promise<void>{
    try {
      const newLikes = Math.max(0, blog.likes - 1);
      const res = await fetch(`http://localhost:5001/blogs/${blog.blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: newLikes }),
      });

      if (!res.ok) {
        console.error("Failed to update likes");
      }
    } catch (err) {
      console.error(err);
    }
}
