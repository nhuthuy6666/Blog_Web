"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Globe, 
  MapPin, 
  Briefcase, 
  FileText,
  Loader2,
  UserCog
} from "lucide-react";

interface EditAccountAuthorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: string;
  authorId: string;
  defaultName: string | null;
  defaultEmail: string | null;
  defaultBusiness: string | null;
  defaultAddress: string | null;
  defaultDescribe: string | null;
  defaultLink : string | null;
}

export default function EditAccountAuthorModal({
  open,
  onOpenChange,
  accountId,
  authorId,
  defaultName,
  defaultEmail,
  defaultBusiness,
  defaultAddress,
  defaultDescribe,
  defaultLink
}: EditAccountAuthorModalProps) {
  // Account state
  const [name, setName] = useState(defaultName ?? "");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [link, setLink] = useState(defaultLink ?? "");

  // Author state
  const [business, setBusiness] = useState(defaultBusiness ?? "");
  const [address, setAddress] = useState(defaultAddress ?? "");
  const [describe, setDescribe] = useState(defaultDescribe ?? "");

  const [loading, setLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = name.trim() && 
                     email.trim() && 
                     isValidEmail(email) &&
                     business.trim() && 
                     address.trim() && 
                     describe.trim();

  const handleSave = async () => {
    setLoading(true);
    try {
      // gọi 2 API song song
      const [resAccount, resAuthor] = await Promise.all([
        fetch(`http://localhost:5001/accounts/${accountId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, email, link }),
        }),
        fetch(`http://localhost:5001/authors/${authorId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ business, address, describe}),
        }),
      ]);

      if (!resAccount.ok || !resAuthor.ok) {
        throw new Error("Cập nhật thất bại");
      }

      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] rounded-3xl bg-white/95 backdrop-blur-sm border-blue-100 shadow-2xl overflow-hidden flex flex-col">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-green-50 p-6 -m-6 mb-4 flex-shrink-0">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800">
            <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <UserCog className="w-6 h-6" />
            </div>
            Chỉnh sửa hồ sơ
          </DialogTitle>
          <p className="text-slate-600 text-sm mt-2 ml-15">Cập nhật thông tin tài khoản và thông tin tác giả của bạn</p>
        </DialogHeader>

        <div className="space-y-8 py-2 px-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {/* Account Section */}
          <div className="bg-gradient-to-r from-blue-50/50 to-transparent rounded-2xl p-6 border border-blue-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Thông tin tài khoản</h3>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Tên hiển thị
                </label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/70"
                  placeholder="Nhập tên hiển thị"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`rounded-xl focus:ring-blue-400/20 bg-white/70 ${
                    email.trim() && !isValidEmail(email)
                      ? "border-red-400 focus:border-red-400"
                      : "border-blue-200 focus:border-blue-400"
                  }`}
                  placeholder="Nhập địa chỉ email"
                />
                {email.trim() && !isValidEmail(email) && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Vui lòng nhập email đúng định dạng (ví dụ: example@domain.com)
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  Website/Liên kết
                </label>
                <Input 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)}
                  className="rounded-xl border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white/70"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-gradient-to-r from-green-50/50 to-transparent rounded-2xl p-6 border border-green-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Thông tin tác giả</h3>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-500" />
                  Nghề nghiệp
                </label>
                <Input 
                  value={business} 
                  onChange={(e) => setBusiness(e.target.value)}
                  className="rounded-xl border-green-200 focus:border-green-400 focus:ring-green-400/20 bg-white/70"
                  placeholder="Nhập nghề nghiệp của bạn"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  Địa chỉ
                </label>
                <Input 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-xl border-green-200 focus:border-green-400 focus:ring-green-400/20 bg-white/70"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-500" />
                  Tiểu sử
                </label>
                <Input 
                  value={describe} 
                  onChange={(e) => setDescribe(e.target.value)}
                  className="rounded-xl border-green-200 focus:border-green-400 focus:ring-green-400/20 bg-white/70"
                  placeholder="Mô tả về bản thân bạn"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-6 border-t border-blue-100">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 px-6"
            disabled={loading}
          >
            Hủy bỏ
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !isFormValid}
            className={`bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl px-8 shadow-lg hover:shadow-xl transition-all duration-200 
              ${!isFormValid ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-green-700 hover:shadow-xl"}`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang lưu...
              </div>
            ) : (
              "Lưu thay đổi"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}