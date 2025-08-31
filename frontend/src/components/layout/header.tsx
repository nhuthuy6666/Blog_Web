"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, BookOpen, Sparkles, User, MessageCircle, Home, CircleUserRound, PenTool } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 shadow-lg shadow-blue-100/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/20 to-green-50/30 pointer-events-none"></div>
      
      <div className="container mx-auto flex h-20 items-center justify-between px-6 relative">
        <Link
          href="/"
          className="flex items-center space-x-3 font-bold text-xl text-slate-800 hover:text-blue-700 transition-all duration-300 hover:scale-105 group"
        >
          <div className="relative p-3 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl text-white shadow-lg shadow-blue-200/50 group-hover:shadow-xl group-hover:shadow-blue-300/50 transition-all duration-300 border-2 border-white">
            <BookOpen size={24} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
            
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles size={12} className="text-yellow-300" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent text-2xl font-extrabold tracking-tight">
              NT Blog
            </span>
            <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            asChild 
            className="text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5 group"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Home size={18} className="group-hover:text-blue-600 transition-colors" />
              <span>Trang chủ</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            asChild 
            className="text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5 group"
          >
            <Link href="/blog" className="flex items-center space-x-2">
              <BookOpen size={18} className="group-hover:text-blue-600 transition-colors" />
              <span>Bài Viết</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            asChild 
            className="text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5 group"
          >
            <Link href="/account" className="flex items-center space-x-2">
              <PenTool size={18} className="group-hover:text-blue-600 transition-colors" />
              <span>Tác giả</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            asChild 
            className="text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5 group"
          >
            <Link href={user ? `/author/${user.accountId}` : "/login"} className="flex items-center space-x-2">
              <CircleUserRound size={18} className="group-hover:text-blue-600 transition-colors" />
              <span>Trang cá nhân</span>
            </Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden p-3 text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 hover:-translate-y-0.5"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
        >
          <Menu size={24} />
        </Button>
      </div>

      <div id="mobile-menu" className="hidden md:hidden border-t border-blue-100 bg-white/90 backdrop-blur-md">
        {/* Mobile menu gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-white/10 to-green-50/20 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 py-4 relative">
          <nav className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              asChild 
              className="justify-start text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 group"
            >
              <Link href="/" className="flex items-center space-x-3">
                <Home size={18} className="group-hover:text-blue-600 transition-colors" />
                <span>Trang chủ</span>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              asChild 
              className="justify-start text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 group"
            >
              <Link href="/blog" className="flex items-center space-x-3">
                <BookOpen size={18} className="group-hover:text-blue-600 transition-colors" />
                <span>Bài Viết</span>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              asChild 
              className="justify-start text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 group"
            >
              <Link href={user ? `/author/${user.accountId}` : "/login"} className="flex items-center space-x-3">
                <User size={18} className="group-hover:text-blue-600 transition-colors" />
                <span>Trang cá nhân</span>
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              asChild 
              className="justify-start text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-100/50 group"
            >
              <Link href="/contact" className="flex items-center space-x-3">
                <MessageCircle size={18} className="group-hover:text-blue-600 transition-colors" />
                <span>Liên Hệ</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}