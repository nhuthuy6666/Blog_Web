"use client";

import { useState } from "react";
import { BookOpen, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, User, Calendar, Building, MapPin, FileText } from "lucide-react";

interface RegisterForm {
  firstname: string;
  lastname: string;
  birthday: string; // YYYY-MM-DD
  business: string;
  address: string;
  describe: string;
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    firstname: "",
    lastname: "",
    birthday: "",
    business: "",
    address: "",
    describe: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if all form fields are filled and email is valid
  const isFormValid = form.firstname.trim() && 
                     form.lastname.trim() && 
                     form.birthday && 
                     form.business.trim() && 
                     form.address.trim() && 
                     form.describe.trim() && 
                     form.name.trim() && 
                     form.email.trim() && 
                     isValidEmail(form.email) &&
                     form.password.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      // 1️⃣Tạo Author trước
      const authorRes = await fetch("http://localhost:5001/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          birthday: form.birthday,
          business: form.business,
          address: form.address,
          describe: form.describe,
        }),
      });

      if (!authorRes.ok) throw new Error("Tạo Author thất bại");

      const authorData = await authorRes.json();
      const authorObjectId = authorData._id;

      // 2️⃣Tạo Account, gắn authorId
      const accountRes = await fetch("http://localhost:5001/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          Author: authorObjectId,   
        }),
      });

      if (!accountRes.ok) throw new Error("Email đã được sử dụng");

      setMessage("Đăng ký thành công!");
      setForm({
        firstname: "",
        lastname: "",
        birthday: "",
        business: "",
        address: "",
        describe: "",
        name: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      setMessage(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_60%)]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Register Card */}
      <div className="w-full max-w-2xl relative">
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
              Tạo tài khoản mới
            </h1>
            <p className="text-slate-600">
              Bắt đầu hành trình chia sẻ câu chuyện của bạn
            </p>
          </div>

          {/* Message */}
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

          {/* Form */}
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Thông tin cá nhân
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Họ</label>
                  <div className="relative">
                    <input
                      name="firstname"
                      placeholder="Nhập họ của bạn"
                      value={form.firstname}
                      onChange={handleChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tên</label>
                  <div className="relative">
                    <input
                      name="lastname"
                      placeholder="Nhập tên của bạn"
                      value={form.lastname}
                      onChange={handleChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Birthday */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Ngày sinh
                </label>
                <div className="relative">
                  <input
                    name="birthday"
                    type="date"
                    value={form.birthday}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Business */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Building className="w-4 h-4 mr-2 text-blue-600" />
                  Nghề nghiệp
                </label>
                <div className="relative">
                  <input
                    name="business"
                    placeholder="Nhập nghề nghiệp của bạn"
                    value={form.business}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  />
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  Địa chỉ
                </label>
                <div className="relative">
                  <input
                    name="address"
                    placeholder="Nhập địa chỉ của bạn"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  />
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  Mô tả bản thân
                </label>
                <div className="relative">
                  <textarea
                    name="describe"
                    placeholder="Viết vài dòng về bản thân bạn..."
                    value={form.describe}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm resize-none"
                  />
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-2 my-6">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
              <span className="text-sm text-slate-500 px-3">Thông tin tài khoản</span>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            </div>

            {/* Account Information Section */}
            <div className="space-y-4">
              {/* Account Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Tên tài khoản
                </label>
                <div className="relative">
                  <input
                    name="name"
                    placeholder="Nhập tên tài khoản"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border-2 rounded-xl p-4 pl-12 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm ${
                      form.email.trim() && !isValidEmail(form.email)
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-blue-500"
                    }`}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
                {form.email.trim() && !isValidEmail(form.email) && (
                  <p className="text-xs text-red-600 mt-1">
                    Vui lòng nhập email đúng định dạng (ví dụ: example@domain.com)
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-600" />
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pl-12 pr-12 focus:border-blue-500 focus:outline-none transition-colors bg-white/80 backdrop-blur-sm"
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
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className={`w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-300
                ${!isFormValid || loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-green-700 hover:shadow-xl"}`}
            >
              <span>{loading ? "Đang tạo tài khoản..." : "Đăng ký"}</span>
              {!loading && isFormValid && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Đã có tài khoản? 
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                Đăng nhập ngay
              </a>
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}