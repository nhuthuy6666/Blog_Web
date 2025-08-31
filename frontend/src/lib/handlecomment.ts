export async function handleCommentPlus(blog: IBlog): Promise<void>{
    try {
      const res = await fetch(`http://localhost:5001/blogs/${blog.blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: blog.comments + 1 }),
      });

      if (!res.ok) {
        console.error("Failed to update comments");
      }
    } catch (err) {
      console.error(err);
    }
}

export async function handleCommentSubtraction(blog: IBlog): Promise<void>{
    try {
      const newComments = Math.max(0, blog.comments - 1);
      const res = await fetch(`http://localhost:5001/blogs/${blog.blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: newComments }),
      });

      if (!res.ok) {
        console.error("Failed to update comments");
      }
    } catch (err) {
      console.error(err);
    }
}

