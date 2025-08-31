"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reply, Send } from "lucide-react";
import { handleCommentPlus } from "@/lib/handlecomment";
import LoginDialog from "@/components/notice/logindialog";

export default function RepComment({
  user,
  blogId,
  parentId,
  blog,
  onCommentAdded
}: {
  user: User | null;
  blogId: number;
  parentId: string;
  blog: IBlog;
  onCommentAdded: (comment: IComment) => void;
}) {
  const [replying, setReplying] = useState(false);
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
      const res = await fetch(
        `http://localhost:5001/comments/${user.accountId}/${blogId}/${parentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            likes: 0,
          }),
        }
      );

      if (!res.ok) throw new Error("Đăng trả lời thất bại");

      const newReply = await res.json();
      onCommentAdded(newReply);
      handleCommentPlus(blog)

      // Reset
      setContent("");
      setReplying(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 sm:mt-3">
      {replying ? (
        <div className="ml-4 sm:ml-8 mt-4 sm:mt-6">
          <div className="flex items-start space-x-2 sm:space-x-3">
            {/* Avatar giống style comment */}
            <div className="bg-gradient-to-br from-slate-400 to-slate-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            
            {/* Input + Buttons */}
            <div className="flex-1 min-w-0">
              <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-100">
                <textarea
                  className="w-full p-2 sm:p-3 border-0 bg-transparent text-xs sm:text-sm resize-none focus:outline-none placeholder-slate-400"
                  placeholder="Viết phản hồi..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-2 sm:mt-3 ml-2 sm:ml-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto p-1 text-slate-400 hover:text-slate-600"
                  onClick={() => setReplying(false)}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !content.trim()}
                  size="sm"
                  className="text-xs h-auto p-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3 h-3 mr-1" />
                  {loading ? "Đang gửi..." : "Gửi"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-600 h-auto p-1"
          onClick={() => setReplying(true)}
        >
          <Reply className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Trả lời
        </Button>
      )}
      {/* dialog login */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </div>
  );
}