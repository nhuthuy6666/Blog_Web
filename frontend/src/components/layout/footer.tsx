"use client";
import Link from "next/link";
import { Mail, Smartphone, BookOpen, Sparkles, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-blue-100 bg-gradient-to-br from-blue-50 via-white to-green-50 mt-auto overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.06),transparent_50%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-green-200/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-green-200/15 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-6 py-16 relative">
        <Card className="bg-white/80 backdrop-blur-md border-blue-100 shadow-2xl shadow-blue-100/20 hover:shadow-blue-200/30 transition-all duration-500 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/10 to-green-50/20"></div>
          <CardContent className="relative p-10">
            {/* Brand Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent text-3xl font-extrabold tracking-tight">
                  NT Blog
                </span>
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Khám phá những bài viết thú vị và bổ ích được cập nhật hằng ngày từ cộng đồng writer tài năng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Về Blog */}
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-600 rounded-full"></div>
                  <h3 className="font-bold text-lg text-slate-800">Về Blog</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-4">
                  Nơi chia sẻ kiến thức, kinh nghiệm và những câu chuyện thú vị 
                  trong hành trình phát triển bản thân và sự nghiệp.
                </p>
                <div className="pl-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl text-sm">
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>

              {/* Liên Kết Nhanh */}
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-600 rounded-full"></div>
                  <h3 className="font-bold text-lg text-slate-800">Khám Phá</h3>
                </div>
                <div className="flex flex-col space-y-3 text-sm pl-4">
                  <Link 
                    href="/blog" 
                    className="text-slate-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 transform flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    <span>Tất cả bài viết</span>
                  </Link>
                  <Link 
                    href="/categories" 
                    className="text-slate-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 transform flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-green-600 transition-colors"></span>
                    <span>Danh mục</span>
                  </Link>
                  <Link 
                    href="/tags" 
                    className="text-slate-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 transform flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    <span>Thẻ bài viết</span>
                  </Link>
                  <Link 
                    href="/archive" 
                    className="text-slate-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 transform flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-green-600 transition-colors"></span>
                    <span>Lưu trữ</span>
                  </Link>
                </div>
              </div>

              {/* Liên Hệ */}
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-600 rounded-full"></div>
                  <h3 className="font-bold text-lg text-slate-800">Liên Hệ</h3>
                </div>
                <div className="flex flex-col space-y-4 text-sm text-slate-600 pl-4">
                  <div className="flex items-center space-x-3 hover:text-blue-700 transition-colors group">
                    <div className="p-2 bg-blue-100/70 rounded-xl group-hover:bg-blue-200/70 transition-all duration-300 group-hover:shadow-md">
                      <Mail size={16} className="text-blue-500" />
                    </div>
                    <span>contact@ntblog.com</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:text-blue-700 transition-colors group">
                    <div className="p-2 bg-green-100/70 rounded-xl group-hover:bg-green-200/70 transition-all duration-300 group-hover:shadow-md">
                      <Smartphone size={16} className="text-green-500" />
                    </div>
                    <span>(+84) 912-345-678</span>
                  </div>
                </div>
              </div>

              {/* Mạng Xã Hội */}
              <div className="space-y-5">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-600 rounded-full"></div>
                  <h3 className="font-bold text-lg text-slate-800">Kết Nối</h3>
                </div>
                <div className="flex flex-col space-y-3 pl-4">
                  <p className="text-sm text-slate-600 mb-2">Theo dõi chúng tôi tại:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href="#" 
                      className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <Github size={16} className="text-slate-600 group-hover:text-blue-600" />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600">GitHub</span>
                    </Link>
                    <Link 
                      href="#" 
                      className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <Linkedin size={16} className="text-slate-600 group-hover:text-blue-600" />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600">LinkedIn</span>
                    </Link>
                    <Link 
                      href="#" 
                      className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-xl hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <Twitter size={16} className="text-slate-600 group-hover:text-blue-600" />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600">Twitter</span>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
            
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600">
              <p className="font-medium flex items-center space-x-2">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></span>
                <span>© {new Date().getFullYear()} NT Blog. All rights reserved.</span>
              </p>
              <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                <Link href="/privacy" className="hover:text-blue-700 transition-colors duration-300 font-medium hover:underline underline-offset-4">
                  Chính sách bảo mật
                </Link>
                <Link href="/terms" className="hover:text-blue-700 transition-colors duration-300 font-medium hover:underline underline-offset-4">
                  Điều khoản sử dụng
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <ArrowUp size={16} className="group-hover:text-blue-600" />
                  <span className="ml-1 text-xs">Lên đầu</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}