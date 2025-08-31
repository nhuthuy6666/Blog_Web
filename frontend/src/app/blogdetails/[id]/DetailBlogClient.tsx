"use client";

import { 
  User, 
  CalendarDays, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark, 
  Clock,
  TrendingUp,
  BookOpen,
  Coffee,
  Sparkles,
  Award,
  Globe,
  Zap,
  PenTool
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CommentPage from "@/components/blogs/comment";
import NavigationPage from "@/components/blogs/navigationbtns";
import SidePage from "@/components/blogs/sidebar";
import ActionBtn from "@/components/blogdetails/actionbtn";

export default function DetailBlogClient({ id }: { id: number }) {

    const [blogFetch, setBlogFetch] = useState<IBlog | null>(null);
    const [blogs, setBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:5001/blogs/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch blog");
                return res.json();
            })
            .then((data) => setBlogFetch(data))
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        fetch("http://localhost:5001/blogs")
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    if (!blogFetch) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
                {/* Loading Hero Section */}
                <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-blue-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.08),transparent_50%)]"></div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    
                    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-20 relative">
                        <div className="text-center space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-xl border-4 border-white">
                                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <Badge variant="secondary" className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full animate-pulse">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    Đang tải...
                                </Badge>
                            </div>
                            <Skeleton className="h-10 sm:h-14 w-80 sm:w-96 mx-auto" />
                            <Skeleton className="h-4 sm:h-6 w-72 sm:w-[500px] mx-auto" />
                        </div>
                    </div>
                </section>

                {/* Loading Content */}
                <section className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
                    <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
                        <Coffee className="text-blue-600 animate-spin" size={20} />
                        <span className="text-base sm:text-lg font-semibold text-slate-700">Đang tải bài viết...</span>
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
                        <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <Skeleton className="h-6 sm:h-8 w-3/4" />
                            <Skeleton className="h-4 sm:h-6 w-full" />
                            <Skeleton className="h-4 sm:h-6 w-5/6" />
                            <Skeleton className="h-24 sm:h-32 w-full rounded-xl" />
                        </CardContent>
                    </Card>
                </section>
            </main>
        );
    }

    const readTime = Math.max(1, Math.ceil(blogFetch.content?.length / 1000)) || 5;

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Hero Section with Enhanced Background */}
            <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-blue-100">
                {/* Decorative backgrounds - matching home page */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.12),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_60%)]"></div>
                
                {/* Floating elements - matching home page */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-20 relative">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Header with badge */}
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-xl border-4 border-white">
                                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <Badge variant="secondary" className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    Bài viết
                                </Badge>
                            </div>
                        </div>

                        {/* Article Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4 break-words">
                                {blogFetch?.title || "Đang tải..."}
                            </h1>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                Khám phá nội dung thú vị và bổ ích từ cộng đồng writer tài năng
                            </p>
                        </div>

                        {/* Enhanced Author Info & Stats Card */}
                        <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    {/* Author Section */}
                                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                                        <Link href={`/author/${blogFetch.Account.accountId}`} className="flex-shrink-0">
                                            <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg border-3 border-white group-hover:scale-105 transition-transform">
                                                <span className="font-bold text-sm sm:text-lg">
                                                    {blogFetch?.Account?.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </Link>
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <Link href={`/author/${blogFetch.Account.accountId}`} className="flex items-center gap-2 text-slate-800 font-semibold text-base sm:text-lg hover:text-blue-600 transition-colors truncate">
                                                <User className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="truncate">{blogFetch?.Account?.name}</span>
                                            </Link>
                                            <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                                                <div className="flex items-center gap-1 whitespace-nowrap">
                                                    <CalendarDays className="w-4 h-4 text-blue-400" />
                                                    <span>{new Date(blogFetch?.postDate).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <div className="flex items-center gap-1 whitespace-nowrap">
                                                    <Clock className="w-4 h-4 text-green-400" />
                                                    <span>{readTime} phút đọc</span>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    Trending
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced Stats & Actions */}
                                    <ActionBtn blogFetch={blogFetch} />
                                    
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
                <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Article Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Enhanced Content Card */}
                        <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <CardContent className="p-6 sm:p-8 lg:p-10 xl:p-12">
                                {/* Content Header */}
                                <div className="flex items-center justify-center space-x-4 mb-8">
                                    <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                                    <div className="flex items-center space-x-2 px-4">
                                        <PenTool className="text-blue-600" size={18} />
                                        <span className="text-lg font-semibold text-slate-800">Nội dung bài viết</span>
                                        <Sparkles className="text-green-600" size={18} />
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                                </div>

                                {/* Article Content */}
                                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                                    <div className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-wrap break-words hyphens-auto overflow-wrap-anywhere space-y-6">
                                        <div className="first-letter:text-4xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                                            {blogFetch?.content || "Đang tải nội dung..."}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Footer */}
                                <div className="mt-8 pt-6 border-t border-blue-100">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                                            <Award className="w-4 h-4 text-yellow-500" />
                                            <span>Nội dung chất lượng cao</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Badge variant="outline" className="text-xs">
                                                <Globe className="w-3 h-3 mr-1" />
                                                Công khai
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                                <Zap className="w-3 h-3 mr-1" />
                                                Mới
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <CommentPage id={id} blog={blogFetch} />

                        {/* Navigation */}
                        <NavigationPage id={blogFetch.Account.accountId} blogId={id} blogFetch={blogFetch} />
                        
                    </div>

                    {/* Enhanced Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Original Sidebar */}
                        <SidePage blogFetch={blogFetch} blogs={blogs} />
                    </div>
                </div>
            </div>
        </main>
    );
};