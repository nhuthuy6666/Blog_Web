"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { handleCommentPlus } from "@/lib/handlecomment";
import LoginDialog from "@/components/notice/logindialog";

export default function AddComment({
  user,
  blogId,
  blog,
  onCommentAdded
}: {
  user: User | null;
  blogId: number;
  blog: IBlog;
  onCommentAdded: (comment: IComment) => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      setLoginDialogOpen(true);
      return;
    }
    if (!content.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5001/comments/${user.accountId}/${blogId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
            likes: 0,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Đăng bình luận thất bại");
      }

      const newComment = await res.json();
      onCommentAdded(newComment);
      handleCommentPlus(blog);

      // Reset
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50/50 to-green-50/50 rounded-lg sm:rounded-xl border border-blue-100">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Avatar */}
        <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base font-semibold flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>

        {/* Input + Button */}
        <div className="flex-1 space-y-3">
          <textarea
            placeholder="Viết bình luận của bạn..."
            className="w-full p-3 sm:p-4 border border-blue-200 rounded-lg sm:rounded-xl text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white/70 backdrop-blur-sm"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              {loading ? "Đang gửi..." : "Đăng bình luận"}
            </Button>
          </div>
        </div>
      </div>
      {/* dialog login */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </div>
  );
}
