"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, X, AlertTriangle } from "lucide-react";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onOpenChange(false);
    setTimeout(() => {
      window.location.href = "/login"; 
    }, 50);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md p-0 border-0 bg-transparent shadow-none">
        <div className="bg-white/95 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-100/50 to-orange-100/30 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-100/40 to-purple-100/20 rounded-full blur-xl translate-y-10 -translate-x-10"></div>
          
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>

          <DialogHeader className="text-center mb-8 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-white relative">
                <LogOut className="w-8 h-8" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                  <AlertTriangle className="w-3 h-3 text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Xác nhận đăng xuất
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-base leading-relaxed">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?
                <br />
                <span className="text-sm text-slate-500 mt-2 block">
                  Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng.
                </span>
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 border-slate-200 rounded-xl py-3 px-6 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              <span className="font-medium">Hủy</span>
            </Button>
            <Button 
              onClick={handleLogout}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Đăng xuất</span>
            </Button>
          </DialogFooter>

          {/* Bottom decoration line */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-red-300 to-orange-300 rounded-full opacity-50"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}