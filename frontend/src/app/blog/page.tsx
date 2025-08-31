"use client";

import React, { useState, useMemo, useEffect, use } from 'react';
import BlogCard from '@/components/blogs/blogcard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,  
  BookOpen, 
  Calendar, 
  Heart, 
  MessageCircle,
  TrendingUp,
  Users,
  Filter,
  Star,
  X,
  Zap
} from 'lucide-react';
import { formatNumber } from '@/lib/formatNumber';
import { getUser } from '@/lib/getUser';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [authorSearch, setAuthorSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [follows, setFollows] = useState<IFollow | null>(null);
  const [followBlogs, setFollowBlogs] = useState<IBlog[]>([]);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const isOwner = user?.accountId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(getUser());
        if (isOwner) {
          const resFollow = await fetch(`http://localhost:5001/follows/${user.accountId}`);
          const dataFollow = await resFollow.json();
          setFollows(dataFollow);

          if (dataFollow?.listAccount?.length > 0) {
            console.log("Danh sách listAccount:", dataFollow.listAccount);
            const blogPromises = dataFollow.listAccount.map((acc: IAccount) =>
              fetch(`http://localhost:5001/blogs/account/${acc.accountId}`).then(res => res.json())
            );
            const blogsByAuthors = await Promise.all(blogPromises);
            setFollowBlogs(blogsByAuthors.flat());
            console.log("Danh sách listAccount:", followBlogs);
          }
        }

        const resBlogs = await fetch("http://localhost:5001/blogs");
        const dataBlogs = await resBlogs.json();
        setBlogs(dataBlogs);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [isOwner]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesAuthor = blog.Account?.name?.toLowerCase().includes(authorSearch.toLowerCase().trim());
      
      return matchesSearch && matchesAuthor;
    });

    // Sort blogs
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        break;
      case "popular":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "liked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "commented":
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case "hotAuthor":
        filtered.sort((a, b) => b.Account.followers - a.Account.followers);
        break;
      case "trending":
        filtered.sort((a, b) => {
          const aScore = a.likes + a.comments + a.views/10;
          const bScore = b.likes + b.comments + b.views/10;
          return bScore - aScore;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [blogs, searchQuery, sortBy, authorSearch]);

  // Lọc blog follow dựa trên searchQuery và authorSearch
  const filteredFollowBlogs = useMemo(() => {
    if (!followBlogs || followBlogs.length === 0) return [];

    return followBlogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesAuthor = blog.Account?.name?.toLowerCase().includes(authorSearch.toLowerCase().trim());
      return matchesSearch && matchesAuthor;
    });
  }, [followBlogs, searchQuery, authorSearch]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setAuthorSearch("");
  };

  const hasActiveFilters = searchQuery || authorSearch;

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
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <Badge variant="secondary" className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full">
                <Search className="w-4 h-4 mr-1" />
                Tìm kiếm Blog
              </Badge>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-800 leading-tight px-4">
              Khám phá 
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Kiến thức</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Tìm kiếm và khám phá hàng ngàn bài viết chất lượng cao từ cộng đồng developer
            </p>
          </div>

          {/* Search Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Blog Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/80 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Author Search */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm tác giả..."
                  value={authorSearch}
                  onChange={(e) => setAuthorSearch(e.target.value)}
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
                    ...(isOwner? [{ key: "follow", label: "Follow", icon: Users }] : []),
                    { key: "popular", label: "Phổ biến", icon: TrendingUp },
                    { key: "liked", label: "Yêu thích", icon: Heart },
                    { key: "commented", label: "Bình luận", icon: MessageCircle },
                    { key: "hotAuthor", label: "Tác giả hot", icon: Zap },
                    { key: "trending", label: "Trending", icon: Star },
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
                {(searchQuery || authorSearch) && (
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

        {/* Blog List */}
        {sortBy === "follow" ? (
          followBlogs.length > 0 ? (
            // Hiển thị blog của các author mà user follow
            filteredFollowBlogs.length > 0 ? (
              filteredFollowBlogs.map(blog => (
                <BlogCard key={blog.blogId || blog._id} blog={blog} formatNumber={formatNumber} />
              ))
              ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3">Không tìm thấy kết quả</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc để tìm thấy nội dung phù hợp</p>
                <Button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )
          ) : follows?.listAccount && follows.listAccount.length > 0 ? (
            // Người follow chưa đăng bài
            <div className="text-center py-12">
              <Users className="w-10 h-10 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Không tìm thấy kết quả</h3>
              <p className="text-slate-500">Người mà bạn follow chưa có bài viết nào.</p>
            </div>
          ) : (
            // Chưa follow ai
            <div className="text-center py-12">
              <Users className="w-10 h-10 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Bạn chưa follow ai</h3>
              <p className="text-slate-500">Hãy theo dõi một vài tác giả để thấy bài viết của họ ở đây</p>
            </div>
          )
        ) : filteredBlogs.length > 0 ? (
          // Hiển thị blog thông thường
          filteredBlogs.map((blog, index) => (
            <BlogCard key={blog.blogId || blog._id || index} blog={blog} formatNumber={formatNumber} />
          ))
        ) : (
          // Không tìm thấy kết quả với bộ lọc/search
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3">Không tìm thấy kết quả</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc để tìm thấy nội dung phù hợp</p>
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
};

export default BlogPage;