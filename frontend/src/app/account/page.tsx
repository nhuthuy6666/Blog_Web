"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  Users, 
  Search, 
  PenTool, 
  BookOpen, 
  Heart, 
  Eye, 
  Star,
  Calendar,
  MapPin,
  Filter,
  X,
  UserCheck,
  Trophy,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import AccountCardPage from "@/components/accounts/accountcart";

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    
    useEffect(() => {
        fetch("http://localhost:5001/accounts")
            .then(res => res.json())
            .then(data => setAccounts(data));
    }, []);

    useEffect(() => {
      fetch("http://localhost:5001/blogs")
        .then(res => res.json())
        .then(data => setBlogs(data));
    }, []);

    const topAuthors = [...accounts].sort((a, b) => b.followers - a.followers).slice(0, 3);

    // Filter and sort accounts
    const filteredAccounts = useMemo(() => {
        let filtered = accounts.filter(account => {
            const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                                account.Author.lastname.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                                account.Author.firstname.toLowerCase().includes(searchQuery.toLowerCase().trim());
            const matchesLocation = !locationSearch || 
                                  (account.Author.address && account.Author.address.toLowerCase().includes(locationSearch.toLowerCase().trim()));
            
            return matchesSearch && matchesLocation;
        });

        // Sort accounts
        switch (sortBy) {
            case "newest":
                filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
                break;
            case "followers":
                filtered.sort((a, b) => b.followers - a.followers);
                break;
            case "posts":
                const accountPostCounts = filtered.map(account => ({
                    ...account,
                    postCount: blogs.filter(blog => blog.Account.accountId === account.accountId).length
                }));
                filtered = accountPostCounts.sort((a, b) => b.postCount - a.postCount);
                break;
            case "likes":
                const accountLikeCounts = filtered.map(account => ({
                    ...account,
                    totalLikes: blogs
                        .filter(blog => blog.Account.accountId === account.accountId)
                        .reduce((sum, blog) => sum + blog.likes, 0)
                }));
                filtered = accountLikeCounts.sort((a, b) => b.totalLikes - a.totalLikes);
                break;
            case "pro":
                filtered = filtered.filter((account) => topAuthors.some((a) => a.accountId === account.accountId));
                break;
            default:
                break;
        }

        return filtered;
    }, [accounts, blogs, searchQuery, locationSearch, sortBy]);

    const clearAllFilters = () => {
        setSearchQuery("");
        setLocationSearch("");
    };

    const hasActiveFilters = searchQuery || locationSearch;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
          <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <Badge variant="secondary" className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 mr-1" />
                Cộng đồng
              </Badge>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-800 leading-tight px-4">
              Khám phá 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Tác giả</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Tìm hiểu và kết nối với những tác giả tài năng trong cộng đồng NT Blog
            </p>
          </div>

          {/* Search Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm tác giả theo tên, username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/80 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Location Search */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm theo địa điểm..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/80 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-blue-100">
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
                <div className="flex items-center space-x-2 text-slate-700 font-medium">
                  <Filter className="w-5 h-5 text-blue-600" />
                  <span>Sắp xếp:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "newest", label: "Mới nhất", icon: Calendar },
                    { key: "followers", label: "Followers", icon: Users },
                    { key: "posts", label: "Bài viết", icon: BookOpen },
                    { key: "likes", label: "Lượt thích", icon: Heart },
                    { key: "pro", label: "Pro Member", icon: Trophy }
                  ].map(({ key, label, icon: Icon }) => (
                    <Button
                      key={key}
                      variant={sortBy === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(key)}
                      className="rounded-xl border-blue-200 transition-all hover:scale-105 text-xs sm:text-sm"
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {label}
                    </Button>
                  ))}
                </div>
                {hasActiveFilters && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-800 sm:ml-auto self-start"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Results Info */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            {hasActiveFilters && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Đã lọc
              </Badge>
            )}
          </div>
        </div>

        {/* Account List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredAccounts.map((account) => (
            <AccountCardPage key={account.accountId}
                account={account}
                topAuthors={topAuthors}
                blogs={blogs}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAccounts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3">Không tìm thấy tác giả</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc để tìm thấy tác giả phù hợp</p>
            <Button
              onClick={clearAllFilters}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3"
            >
              <X className="w-4 h-4 mr-2" />
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}