"use client";

import { 
  MessageCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddComment from "@/components/action/addcomment";
import RepComment from "@/components/action/repcomment";
import DeleteComment from "@/components/action/deletecomment";
import { getUser } from "@/lib/getUser";

export default function CommentPage({ id, blog }: { id: number, blog: IBlog }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [visibleReplies, setVisibleReplies] = useState(2);
  const [user, setUser] = useState<User | null>(null);

  const fetchComments = async () => {
  try {
    const res = await fetch("http://localhost:5001/comments");
    const data = await res.json();
    setComments(data);
  } catch (err) {
    console.error("Lỗi load comments:", err);
  }
};

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const blogCmt = comments.filter(comment => comment.Blog.blogId === Number(id)  && !comment.parent);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-xl sm:rounded-2xl shadow-lg mt-6 sm:mt-8">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
            Bình luận
          </h3>
        </div>

        {/* Comment Input */}
        <AddComment 
          user={user} 
          blogId={id}
          blog={blog}
          onCommentAdded={() => fetchComments()}
        />

        {/* Comments List */}
        <div className="space-y-4 sm:space-y-6">
          {blogCmt
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, visibleCount)
            .map((comment) => (
            
            <div 
              key={comment.commentId} 
              className="border-b border-blue-100 pb-4 sm:pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                
                {/* Avatar */}
                <div className="bg-gradient-to-br from-slate-500 to-slate-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-base font-semibold flex-shrink-0">
                  {comment.Account?.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  
                  {/* Comment Box */}
                  <div className="bg-slate-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
                          <Link
                            href={`/author/${comment.Account.accountId}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {comment.Account.name}
                          </Link>
                        </h4>
                        <span className="text-xs sm:text-sm text-slate-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      {comment.Account.accountId == user?.accountId && (
                        <DeleteComment
                          commentId={comment.commentId.toString()}
                          blog={blog}
                          onDeleted={fetchComments}
                        />
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mt-2 sm:mt-3 ml-3 sm:ml-4">
                    <RepComment 
                      user={user} 
                      blogId={id}
                      parentId={comment.commentId.toString()}
                      blog={blog}
                      onCommentAdded={() => fetchComments()}
                    />
                  </div>

                  {/* Replies */}
                  {comment.children?.length > 0 && (
                    <div className="mt-4 sm:mt-6 ml-4 sm:ml-8 space-y-3 sm:space-y-4">
                      
                      {comment.children.slice(0, visibleReplies).map((child) => (
                        <div 
                          key={child.commentId} 
                          className="flex items-start space-x-2 sm:space-x-3"
                        >
                          <div className="bg-gradient-to-br from-slate-400 to-slate-500 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0">
                            {child.Account?.name?.charAt(0).toUpperCase() ?? "?"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-blue-50/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-100">
                              <div className="flex items-center justify-between mb-1 sm:mb-2">
                                <div className="flex items-center space-x-2">
                                  <h5 className="font-medium text-slate-700 text-xs sm:text-sm">
                                    {child.Account.name}
                                  </h5>
                                  <span className="text-xs text-slate-400">
                                    {new Date(child.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                {child.Account.accountId == user?.accountId && (
                                  <DeleteComment
                                    commentId={child.commentId.toString()}
                                    blog={blog}
                                    onDeleted={fetchComments}
                                  />
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {child.content}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 mt-1 sm:mt-2 ml-2 sm:ml-3">
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Load More Replies */}
                      {comment.children.length > 2 && visibleReplies < comment.children.length && (
                            <div className="mt-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                    onClick={() => setVisibleReplies(prev => prev + 5)}
                                >
                                    Xem thêm phản hồi
                                </Button>
                            </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Comments */}
        {blogCmt.length > 5 && visibleCount < comments.length && (
            <div className="mt-6 sm:mt-8 text-center">
                <Button 
                    variant="outline" 
                    className="border-blue-200 hover:bg-blue-50 rounded-lg sm:rounded-xl text-sm sm:text-base"
                    onClick={() => setVisibleCount(prev => prev + 5)}
                >
                    Xem thêm bình luận
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
