import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { getUser } from "@/lib/getUser";
import LoginDialog from "@/components/notice/logindialog";

interface SaveButtonProps {
  blog: IBlog;
}

export default function SaveButton({ blog }: SaveButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u) {
      fetch(`http://localhost:5001/saves/${u.accountId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user saves");
          return res.json();
        })
        .then((data) => {
          if (data?.listBlog?.some((b: any) => b.blogId === blog.blogId)) {
            setIsSaved(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [blog.blogId]);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!user) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/saves/toggle/${user.accountId}/${blog.blogId}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Toggle save failed");

      setIsSaved((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        onClick={handleToggleSave}
        variant="outline"
        size="sm"
        className={`rounded-xl transition-all cursor-pointer group 
          ${
            isSaved
              ? "border-yellow-400 bg-yellow-50 text-yellow-600"
              : "border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 text-yellow-600"
          }`}
      >
        <Bookmark
          className={`w-4 h-4 group-hover:scale-110 transition-transform 
            ${isSaved ? "fill-yellow-500 text-yellow-500" : ""}`}
        />
      </Button>

      {/* dialog login */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  );
}
