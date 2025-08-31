"use client";
import { useState } from "react";
import { Lock, ArrowRight, Sparkles, Eye, EyeOff, Key, Shield } from "lucide-react";

export default function ChangePassword({ id }: { id: string }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    // Kiểm tra tất cả các trường đã nhập
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Vui lòng điền đầy đủ các trường");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/accounts/${id}/changepassword`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Không thể đổi mật khẩu");
      }

      setMessage("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const isSubmitDisabled = !oldPassword || !newPassword || !confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_60%)]"></div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-green-100/30 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
          
          <div className="text-center mb-8 relative">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white">
                <Shield className="w-7 h-7" />
              </div>
              <div className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                NT Blog
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Đổi mật khẩu
            </h1>
            <p className="text-slate-600">
              Cập nhật mật khẩu để bảo mật tài khoản của bạn
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              message.includes("thành công") 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              <p className={`text-sm text-center font-medium ${
                message.includes("thành công") ? "text-green-600" : "text-red-600"
              }`}>
                {message}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Key className="w-4 h-4 mr-2 text-blue-600" />
                Mật khẩu cũ
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 pr-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 pr-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 pr-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleChangePassword}
              disabled={isSubmitDisabled}
              className={`w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-300
                ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-green-700 hover:shadow-xl"}`}
            >
              <span>Đổi mật khẩu</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
              <span className="text-sm text-slate-500 px-3">bảo mật</span>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            </div>
            <p className="text-sm text-slate-500">
              Hãy sử dụng mật khẩu mạnh để bảo vệ tài khoản của bạn
            </p>
          </div>
        </div>

        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}
