"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, BookOpen, User } from "lucide-react";
import Link from "next/link"; 
import { handleView } from "@/lib/handleView";
import { useRouter } from "next/navigation";


interface IProps {
  blogs: IBlog[];
}

const AppCard = ({ blogs }: IProps) => {
  const router = useRouter();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <Card
          key={blog.blogId}
          className="group relative overflow-hidden border-2 border-blue-100/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-blue-50/20 via-cyan-50/30 to-indigo-50/20 hover:from-blue-100/40 hover:via-cyan-100/50 hover:to-indigo-100/40 backdrop-blur-sm hover:border-blue-200/80 hover:scale-[1.02] transform"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-cyan-600/5 to-indigo-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative pb-6 pt-8 px-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-100/80 to-cyan-100/80 rounded-xl group-hover:from-blue-200/80 group-hover:to-cyan-200/80 transition-colors">
                  <User className="text-blue-700 group-hover:text-blue-800" size={20} />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
                    {blog.Account.name}
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="text-cyan-400" size={12} />
                    <span className="text-xs text-blue-500/80">{new Date(blog.postDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <Link href={`/author/${blog.Account.accountId}`} className="p-2 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full group-hover:from-blue-600/20 group-hover:to-cyan-600/20 transition-all inline-flex items-center justify-center z-10">
                <ArrowRight
                  className="text-blue-600 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                  size={18}
                />
              </Link>
            </div>
          </CardHeader>

          <CardContent className="relative px-8 pb-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">
                {blog.title}
              </h3>

              <div className="flex items-center space-x-2 text-blue-600/70">
                <BookOpen size={16} />
                <span className="text-sm font-medium">Bài viết</span>
              </div>

              <p className="text-base text-slate-600/90 leading-relaxed line-clamp-4 group-hover:text-slate-700 transition-colors">
                {blog.content}
              </p>
            </div>

            <div className="pt-4 border-t border-blue-100/50">
              <Button
                asChild
                variant="outline"
                className="w-full h-12 border-2 border-blue-200/80 bg-gradient-to-r from-white/80 to-blue-50/80 text-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-cyan-700 hover:text-white hover:border-blue-700 transition-all duration-300 font-semibold text-base rounded-xl group-hover:shadow-lg"
              >
                <div onClick={() => {
                    handleView(blog);
                    router.push(`/blogdetails/${blog.blogId}`);
                  }} 
                  className="flex items-center justify-center space-x-2 cursor-pointer">
                  <span>Đọc tiếp</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
            </div>
          </CardContent>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/20 via-cyan-200/20 to-indigo-200/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-cyan-100/30 via-blue-100/30 to-indigo-100/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </Card>
      ))}
    </div>
  );
};

export default AppCard;