"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, Heart, MessageCircle, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import { formatNumber } from "@/lib/formatNumber"
import { handleView } from "@/lib/handleView";
import { useRouter } from "next/navigation";

export default function AllBlogsModal({
  open,
  onClose,
  blogs,
}: {
  open: boolean
  onClose: () => void
  blogs: IBlog[]
}) {

  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-sm border-blue-100 rounded-3xl shadow-2xl">
        <DialogHeader className="pb-6 border-b border-blue-100">
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
            Tất cả bài viết
            <span className="ml-3 text-sm font-normal bg-gradient-to-r from-blue-500 to-green-600 text-white px-3 py-1 rounded-full">
              {blogs.length} bài viết
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(85vh-120px)] pr-2 -mr-2">
          <div className="space-y-4 mt-6">
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <div key={post.blogId} onClick={() => {
                    handleView(post);
                    router.push(`/blogdetails/${post.blogId}`);
                  }} 
                  className="cursor-pointer">
                  <div className="group p-6 rounded-2xl border border-blue-100 hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-green-50/50  hover:border-blue-200 cursor-pointer hover:shadow-lg bg-white/60">
                    <div className="flex flex-col space-y-3">
                      <h4 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors leading-relaxed line-clamp-2">
                        {post.title}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-slate-600">
                          <span className="flex items-center hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="font-medium">{formatNumber(post.views)}</span>
                          </span>
                          <span className="flex items-center hover:text-pink-600 transition-colors">
                            <Heart className="w-4 h-4 mr-2 text-pink-500" />
                            <span className="font-medium">{formatNumber(post.likes)}</span>
                          </span>
                          <span className="flex items-center hover:text-green-600 transition-colors">
                            <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                            <span className="font-medium">{formatNumber(post.comments)}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-slate-500 bg-blue-50 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3 mr-2 text-blue-500" />
                          {new Date(post.postDate).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-blue-500" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">
                  Chưa có bài viết nào
                </h4>
                <p className="text-slate-500 max-w-md leading-relaxed">
                  Hiện tại chưa có bài viết nào được đăng tải. Hãy quay lại sau để khám phá những nội dung thú vị!
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}