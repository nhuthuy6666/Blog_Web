"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleCommentSubtraction } from "@/lib/handlecomment";

export default function DeleteComment({
  commentId,
  blog,
  onDeleted,
}: {
  commentId: string;
  blog: IBlog,
  onDeleted: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5001/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xoá thất bại");
      onDeleted();
      setOpen(false);
      handleCommentSubtraction(blog);
    } catch (err) {
      console.error("Lỗi xoá comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút xoá */}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-3 h-3 text-slate-400" />
      </Button>

      {/* Dialog confirm */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md p-0 border-0 bg-transparent shadow-none">
          <div className="bg-white/95 backdrop-blur-sm border border-red-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100/50 to-orange-100/30 rounded-full blur-2xl -translate-y-8 translate-x-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-red-100/40 to-pink-100/20 rounded-full blur-xl translate-y-6 -translate-x-6"></div>
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>

            <DialogHeader className="text-center mb-6 space-y-4">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white">
                  <Trash2 className="w-6 h-6" />
                </div>
              </div>
              
              <div className="space-y-2">
                <DialogTitle className="text-xl font-bold text-slate-800">
                  Xác nhận xoá bình luận
                </DialogTitle>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Bạn có chắc chắn muốn xoá bình luận này không?
                  <br />
                  <span className="text-xs text-slate-500 mt-1 block">
                    Thao tác này sẽ không thể hoàn tác.
                  </span>
                </p>
              </div>
            </DialogHeader>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="flex-1 border-2 border-slate-200 rounded-xl py-2.5 px-5 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                <span className="font-medium">Huỷ</span>
              </Button>
              <Button 
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:from-red-500 disabled:hover:to-red-600"
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{loading ? "Đang xoá..." : "Xoá"}</span>
              </Button>
            </DialogFooter>

            {/* Bottom decoration line */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-red-300 to-pink-300 rounded-full opacity-50"></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}