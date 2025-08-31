import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { User, Clock, Bookmark, Eye, Heart, MessageCircle } from "lucide-react";
import { formatNumber } from "@/lib/formatNumber";

export default function SaveCard({ blog }: { blog: IBlog }) {
  const readTime = Math.max(1, Math.ceil(blog.content?.length / 1000)) || 5;
  return (
    <Link href={`/blogdetails/${blog.blogId}`} passHref>
      <Card
        key={blog.blogId}
        className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center text-xs text-slate-500 gap-3">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {blog.Account.name}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime} phút đọc
              </span>
            </div>
            <Bookmark className="w-5 h-5 text-blue-500 fill-current" />
          </div>

          <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 leading-snug">
            {blog.title}
          </h3>

          <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
            {blog.content}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatNumber(blog.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {formatNumber(blog.likes)}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {formatNumber(blog.comments)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
