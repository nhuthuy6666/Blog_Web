"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Check if form is valid
  const isFormValid = email.trim() && password.trim();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      setError("Sai tài khoản hoặc mật khẩu");
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const data = await res.json();

    localStorage.setItem("token", data.access_token); 
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_60%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Card background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-green-100/30 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-white">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                NT Blog
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Chào mừng trở lại
            </h1>
            <p className="text-slate-600">
              Đăng nhập để tiếp tục khám phá thế giới blog
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 pr-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-300
                ${!isFormValid ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-green-700 hover:shadow-xl"}`}
            >
              <span>Đăng nhập</span>
              <ArrowRight className={`w-5 h-5 transition-transform ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
              <span className="text-sm text-slate-500 px-3">hoặc</span>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Chưa có tài khoản? 
                <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                  Đăng ký ngay
                </a>
              </p>
              <a href="/" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                Quên mật khẩu?
              </a>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}