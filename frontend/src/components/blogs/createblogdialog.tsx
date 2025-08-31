"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, BookOpen, Sparkles, X, Send } from "lucide-react";

interface CreateBlogDialogProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
}

export default function CreateBlogDialog({ open, onClose, accountId }: CreateBlogDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/blogs/${accountId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title, content}),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm blog");
      const newBlog = await res.json();

      onClose();
      setTitle("");
      setContent("");
      window.location.href = `/blogdetails/${newBlog.blogId}`;
    } catch (error) {
      console.error(error);
      alert("Không thể thêm blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-sm border-blue-200 rounded-3xl shadow-2xl flex flex-col">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)] rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.06),transparent_50%)] rounded-3xl"></div>
        
        <DialogHeader className="relative space-y-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                  <span>Viết bài mới</span>
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </DialogTitle>
                <p className="text-sm text-slate-600 mt-1">Chia sẻ ý tưởng và kiến thức của bạn với cộng đồng</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 py-4 relative pr-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Tiêu đề bài viết</span>
            </label>
            <Input
              placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
              <PenTool className="w-4 h-4 text-green-600" />
              <span>Nội dung</span>
            </label>
            <Textarea
              placeholder="Viết nội dung bài viết tại đây... Hãy chia sẻ những ý tưởng thú vị và bổ ích của bạn!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 resize-none min-h-[300px] max-h-[400px] overflow-y-auto"
            />
          </div>
          
          {(title || content) && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs text-slate-600 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Bài viết của bạn đang được viết... {title && content ? 'Sẵn sàng đăng!' : 'Cần thêm thông tin.'}</span>
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-end gap-3 pt-4 border-t border-blue-100 relative flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-blue-200 text-slate-600 hover:bg-blue-50 hover:text-slate-700 rounded-xl"
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !title || !content}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang lưu...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Đăng bài</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}