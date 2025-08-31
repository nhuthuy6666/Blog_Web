import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/formatNumber";
import { Trophy, MapPin, Calendar, BookOpen, Users, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import FollowButton from "@/components/action/followbtn";
import { getUser } from "@/lib/getUser";
import { useEffect, useState } from "react";

export default function AccountCardPage({
  account,
  topAuthors,
  blogs,
}: {
  account: IAccount;
  topAuthors: IAccount[];
  blogs: IBlog[];
}) {
  const [user, setUser] = useState<User | null>(null);
  const [followers, setFollowers] = useState<number>(account.followers);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const isOwner = user?.accountId === account.accountId;

  return (
    <div
      onClick={() => {
        router.push(`/author/${account.accountId}`);
      }}
      className="block group cursor-pointer"
    >
      <Card className="group relative overflow-hidden border-2 border-blue-100/60 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl bg-gradient-to-br from-blue-50/20 via-cyan-50/30 to-indigo-50/20 hover:from-blue-100/40 hover:via-cyan-100/50 hover:to-indigo-100/40 backdrop-blur-sm hover:border-blue-200/80 hover:scale-[1.01] transform">
        
        {/* Overlay hiệu ứng hover */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br 
                        from-blue-600/5 via-cyan-600/3 to-indigo-600/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col space-y-4">

            {/* ===== Author Info ===== */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div className="flex items-start space-x-3 sm:space-x-4">
                
                {/* Avatar */}
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white 
                                rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center 
                                text-lg sm:text-2xl font-bold flex-shrink-0">
                  {account.name.charAt(0).toUpperCase()}
                </div>
                
                {/* Name + Meta */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-xl sm:text-2xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
                      {account.name}
                    </h4>

                    {topAuthors.includes(account) && (
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs"
                      >
                        <Trophy className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm sm:text-base text-blue-600 mb-2">
                    {account.Author.lastname} {account.Author.firstname}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="text-slate-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-500">
                        {account.Author.address}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="text-slate-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-500">
                        Tham gia {new Date(account.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    <Badge 
                      variant="outline" 
                      className="text-xs text-green-600 border-green-200 bg-green-50"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Đang hoạt động
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Bio ===== */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                {account.Author.describe}
              </p>
            </div>

            {/* ===== Stats & Actions ===== */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-3 sm:pt-4 border-t border-blue-100/50">
              
              {/* Stats */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-1 text-slate-500">
                  <BookOpen className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(
                      blogs.filter(b => b.Account.accountId === account.accountId).length
                    )} bài viết
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-slate-500">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(followers)} followers
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-slate-500">
                  <Heart className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    {formatNumber(
                      blogs
                        .filter(b => b.Account.accountId === account.accountId)
                        .reduce((sum, blog) => sum + blog.likes, 0)
                    )} likes
                  </span>
                </div>
              </div>

              {/* Actions */}
              {!isOwner && (
                <div className="relative z-10 cursor-pointer">
                  <FollowButton account={account} onLikeChange={setFollowers}/>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br 
                        from-blue-200/20 via-cyan-200/20 to-indigo-200/20 
                        rounded-full blur-xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500" />
      </Card>
    </div>
  );
}
