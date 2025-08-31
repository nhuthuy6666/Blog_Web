import AppCard from "@/components/home/appcard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  BookOpen, 
  PenTool, 
  Sparkles, 
  TrendingUp, 
  Coffee, 
  Users,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Eye,
  MessageCircle,
  Globe,
  Award,
  Rocket
} from "lucide-react";
import useSWR from "swr";
import { formatNumber } from "@/lib/formatNumber";

export default async function Home() {

  const resBlog = await fetch("http://localhost:5001/blogs");
  const resAcc = await fetch("http://localhost:5001/accounts");
  const blogs: IBlog[] = await resBlog.json();
  const accounts: IAccount[] = await resAcc.json();

  if (!blogs) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Loading Hero Section */}
        <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-blue-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.08),transparent_50%)]"></div>
          
          <div className="max-w-6xl mx-auto px-4 py-16 relative">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                  <BookOpen className="w-8 h-8" />
                </div>
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-14 w-96 mx-auto" />
              <Skeleton className="h-6 w-[500px] mx-auto" />
            </div>
          </div>
        </section>

        {/* Loading Stats */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-3 rounded-full" />
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Cards */}
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Coffee className="text-blue-600 animate-spin" size={20} />
              <span className="text-lg font-semibold text-slate-700">Đang tải bài viết...</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-8 w-20 rounded-xl" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const totalViews = formatNumber(blogs.reduce((sum, blog) => sum + blog.views, 0));
  const totalLikes = formatNumber(blogs.reduce((sum, blog) => sum + blog.likes, 0));
  const totalBlogs = formatNumber(blogs.length);
  const totalAuthors = formatNumber(accounts.length);

  const topAuthors = [...accounts].sort((a, b) => b.followers - a.followers).slice(0, 3); 

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-blue-100">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.08),transparent_60%)]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-6xl mx-auto px-4 py-20 relative">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl border-4 border-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <Badge variant="secondary" className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 mr-1" />
                NT Blog
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
                Listen to the 
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> World</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Khám phá những bài viết thú vị và bổ ích được cập nhật hằng ngày từ cộng đồng writer tài năng
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              <Link href="/blog">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Rocket className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Khám phá ngay</span>
                    <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 rounded-xl">
                  <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Tham gia cộng đồng</span>
              </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalBlogs}</div>
              <div className="text-sm text-slate-600">Bài viết</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full group-hover:from-green-200 group-hover:to-green-300 transition-all">
                  <PenTool className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalAuthors}</div>
              <div className="text-sm text-slate-600">Tác giả</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalViews}</div>
              <div className="text-sm text-slate-600">Lượt xem</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full group-hover:from-pink-200 group-hover:to-pink-300 transition-all">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{totalLikes}</div>
              <div className="text-sm text-slate-600">Lượt thích</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Quick Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Xu hướng
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Công nghệ</span>
                  <Badge variant="secondary" className="text-xs">Hot</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Lập trình</span>
                  <Badge variant="outline" className="text-xs">Trending</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">UI/UX</span>
                  <Badge variant="outline" className="text-xs">Popular</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Authors */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Tác giả nổi bật
              </h3>
              <div className="space-y-3">
                {topAuthors.map((author, index) => (
                  <Link 
                    key={author.accountId} 
                    href={`/author/${author.accountId}`} 
                    className="flex items-center space-x-3 hover:bg-slate-50 p-2 rounded-lg transition"
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                      {author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{author.name}</div>
                      <div className="text-xs text-slate-500">{author.Author.business}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">Pro</Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-600" />
                Cộng đồng
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Thành viên
                  </span>
                  <span className="text-sm font-semibold text-slate-800">2.1K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Thảo luận
                  </span>
                  <span className="text-sm font-semibold text-slate-800">450+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    Quốc gia
                  </span>
                  <span className="text-sm font-semibold text-slate-800">25+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Cards Section */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
              <div className="flex items-center space-x-2 px-6">
                <Zap className="text-blue-600" size={20} />
                <span className="text-xl font-bold text-slate-800">Bài viết mới nhất</span>
                <Sparkles className="text-green-600" size={20} />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Cập nhật những bài viết chất lượng cao từ cộng đồng writer tài năng
            </p>
          </div>

          <div className="animate-fade-in-up">
            <AppCard blogs={blogs?.sort((a: IBlog, b: IBlog) => b.blogId - a.blogId).slice(0, 6)} />
          </div>
        </div>
      </section>
    </main>
  );
}