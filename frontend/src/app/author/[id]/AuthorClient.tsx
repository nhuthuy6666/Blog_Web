"use client";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  User, 
  PenTool, 
  MapPin, 
  Calendar,
  Globe,
  Github,
  Twitter,
  Instagram,
  BookOpen,
  Eye,
  Heart,
  Users,
  Loader2,
} from "lucide-react";
import AchievementPage from "@/components/authors/achievement";
import RecentBlogPage from "@/components/authors/recentblogs";
import ButtonPage from "@/components/authors/button";
import { formatNumber } from "@/lib/formatNumber";

export default function AuthorClient({ id }: { id: string }) {
  
  const [account, setAccount] = useState<IAccount | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [followers, setFollowers] = useState<number>(0);
  
  useEffect(() => {
    if (!id) return;
      setIsLoadingAccount(true);
      fetch(`http://localhost:5001/accounts/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch account");
          return res.json();
        })
        .then((data) => {
          setAccount(data);
          setFollowers(data.followers ?? 0);
          setIsLoadingAccount(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingAccount(false);
        });
  }, [id]);

  useEffect(() => {
      setIsLoadingBlogs(true);
      fetch("http://localhost:5001/blogs")
        .then(res => res.json())
        .then(data => {
          setBlogs(data);
          setIsLoadingBlogs(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingBlogs(false);
        });
  }, []);

  const accoutBlog = blogs.filter(blog => blog.Account.accountId == id);
  const isLoading = isLoadingAccount || isLoadingBlogs;

  const stats = [
    { label: "Bài viết", value: `${formatNumber(accoutBlog.length)}`, icon: BookOpen, color: "text-blue-600" },
    { label: "Lượt xem", value: `${formatNumber(accoutBlog.reduce((sum, blog) => sum + blog.views, 0))}`, icon: Eye, color: "text-green-600" },
    { label: "Người theo dõi", value: `${formatNumber(followers)}`, icon: Users, color: "text-purple-600" },
    { label: "Thích", value: `${formatNumber(accoutBlog.reduce((sum, blog) => sum + blog.likes, 0))}`, icon: Heart, color: "text-pink-600" }
  ];

  // Loading State UI
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Main Content 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header Profile Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-3xl shadow-xl mb-8 overflow-hidden">
          <CardContent className="p-4 sm:p-6 lg:p-8 -mt-8 sm:-mt-8 relative">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:flex-row lg:items-center gap-4 sm:gap-6">
              {/* Avatar Section */}
              <div className="relative flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-xl border-4 border-white">
                  {account?.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 border-2 border-white"></div>
              </div>
              
              {/* Main Info Section */}
              <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{account?.name}</h1>
                  <p className="text-slate-600 flex items-center justify-center sm:justify-start mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{account?.Author?.business}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-slate-600">
                    <span className="flex items-center justify-center sm:justify-start">
                      <MapPin className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" />
                      {account?.Author?.address}
                    </span>
                    <span className="flex items-center justify-center sm:justify-start">
                      <Calendar className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" />
                      Tham gia từ {account?.createdAt && new Date(account.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <PenTool className="inline w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                  {account?.Author?.describe}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 items-center sm:items-start">
                  <a href="#" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm">
                    <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{account?.email}</span>
                  </a>
                  {account?.link && (
                    <a href="#" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors text-sm">
                      <Globe className="w-4 h-4 mr-1 flex-shrink-0" />
                      {account?.link}
                  </a>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs">
                    <Github className="w-3 h-3 mr-1" />
                    GitHub
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 rounded-xl text-xs">
                    <Twitter className="w-3 h-3 mr-1 text-blue-500" />
                    Twitter
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50 rounded-xl text-xs">
                    <Instagram className="w-3 h-3 mr-1 text-pink-500" />
                    Instagram
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <ButtonPage 
                id={id}
                account={account?? null}
                authorId={account?.Author.authorId?? ""}
                defaultName={account?.name ?? null} 
                defaultEmail={account?.email ?? null} 
                defaultBusiness={account?.Author.business?? null}
                defaultAddress={account?.Author.address?? null}
                defaultDescribe={account?.Author.describe?? null}
                defaultLink={account?.link?? null}
                followers={followers}                
                onFollowersChange={setFollowers}
              />

            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievement & Skills */}
          <AchievementPage id={id} acc = {account || null} />

          {/* Recent Posts */}
          <RecentBlogPage id={id} />
          
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          limit={1}            
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastClassName="!max-w-[calc(100vw-2rem)] !w-auto !min-w-[300px] sm:!max-w-[400px] !mx-4 sm:!mx-0 !mb-4 sm:!mb-0"
          className="!bottom-4 !right-4 sm:!bottom-6 sm:!right-6 !left-4 sm:!left-auto !w-auto"
        />
      </div>
    </div>
  );
}