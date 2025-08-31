"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LogIn, X, Shield, Sparkles, BookOpen } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border border-blue-100 rounded-2xl shadow-2xl max-w-md mx-auto">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08),transparent_50%)] rounded-2xl"></div>
        
        <DialogHeader className="relative space-y-4 pt-2">
          {/* Icon and brand section */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-white">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          
          <DialogTitle className="text-center text-xl font-bold text-slate-800 flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Yêu cầu đăng nhập</span>
              <Sparkles className="w-4 h-4 text-green-600" />
            </div>
          </DialogTitle>
          
          {/* Description */}
          <div className="text-center space-y-3">
            <p className="text-slate-600 leading-relaxed">
              Vui lòng đăng nhập để truy cập đầy đủ các tính năng và tham gia cộng đồng NT Blog
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Viết và chia sẻ bài viết</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Tương tác với cộng đồng</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Theo dõi tác giả yêu thích</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="relative flex flex-col sm:flex-row gap-3 pt-6">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md"
          >
            <X className="w-4 h-4 mr-2" />
            Huỷ
          </Button>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleLoginRedirect();
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Đăng nhập ngay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}