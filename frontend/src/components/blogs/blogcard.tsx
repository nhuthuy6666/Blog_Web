"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";
import { handleView } from "@/lib/handleView";
import { useRouter } from "next/navigation";
import LikeButton from "@/components/action/likebtn";
import SaveButton from "@/components/action/savebtn";
import { useState } from "react";

interface BlogCardProps {
  blog: IBlog;
  formatNumber: (num: number) => string;
}

export default function BlogCard({ blog, formatNumber }: BlogCardProps) {
  const readTime = Math.max(1, Math.ceil(blog.content?.length / 1000)) || 5;
  const router = useRouter();
  const [likes, setLikes] = useState(blog.likes);

  return (
    <div onClick={() => {
        handleView(blog);
        router.push(`/blogdetails/${blog.blogId}`);
      }} 
      className="block group cursor-pointer">
      <Card
        key={blog.blogId}
        className="group relative overflow-hidden border-2 border-blue-100/60 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl bg-gradient-to-br from-blue-50/20 via-cyan-50/30 to-indigo-50/20 hover:from-blue-100/40 hover:via-cyan-100/50 hover:to-indigo-100/40 backdrop-blur-sm hover:border-blue-200/80 hover:scale-[1.01] transform">
        {/* Overlay hiệu ứng hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-600/3 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col space-y-4">
            {/* ===== Author & Meta Info ===== */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Avatar chữ cái đầu */}
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold flex-shrink-0">
                  {blog.Account.name.charAt(0).toUpperCase()}
                </div>
                {/* Tên + meta */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors truncate">
                    {blog.Account.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="text-cyan-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-blue-500/80">
                        {new Date(blog.postDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Clock className="text-slate-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-500">
                        {readTime} phút đọc
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Users className="text-slate-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-500">
                        {formatNumber(blog.Account.followers)} followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Blog Content ===== */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                {blog.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors line-clamp-4">
                {blog.content}
              </p>
            </div>

            {/* ===== Stats & Actions ===== */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-3 sm:pt-4 border-t border-blue-100/50">
              
              {/* Stats */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-1 text-slate-500">
                  <Eye className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(blog.views)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-500">
                  <Heart className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(likes)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-500">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(blog.comments)}
                  </span>
                </div>
              </div>

              {/* Bookmark */}
              <div className="flex items-center space-x-2 z-10">
                <LikeButton blog={blog} small onLikeChange={(newLikes: number) => setLikes(newLikes)}/>
                <SaveButton blog={blog} />
                <Button
                  size="sm"
                  variant="outline"
                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg border-slate-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Share clicked!");
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-200/20 via-cyan-200/20 to-indigo-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </Card>
    </div>
  );
}
