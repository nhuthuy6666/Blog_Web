export async function handleView(blog: IBlog): Promise<void>{
    try {
      const res = await fetch(`http://localhost:5001/blogs/${blog.blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ views: blog.views + 1 }),
      });

      if (!res.ok) {
        console.error("Failed to update views");
      }
    } catch (err) {
      console.error(err);
    }
}
