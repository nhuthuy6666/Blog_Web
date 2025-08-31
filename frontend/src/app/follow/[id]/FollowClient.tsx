"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users,
  X,
  Grid3X3,
  List,
} from "lucide-react";
import FollowCard from "@/components/follows/followcard";
import { getUser } from "@/lib/getUser";

export default function FollowClient({ id }: { id: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [follows, setFollows] = useState<IFollow | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
        fetch(`http://localhost:5001/follows/${id}`)
          .then(res => res.json())
          .then(data => setFollows(data));
  }, []);

  useEffect(() => {
      setUser(getUser());
    }, []);

  const isOwner = user?.accountId === id;

  if (!isOwner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Card className="bg-white/80 backdrop-blur-sm border-red-100 rounded-3xl shadow-xl p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">Không có quyền truy cập</h3>
          <p className="text-red-500">Bạn không có quyền xem danh sách người theo dõi của người dùng này.</p>
        </Card>
      </div>
    );
  }

  // Filter and sort followers based on search query and sort option
  const filteredFollowers = follows?.listAccount?.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-3xl shadow-xl mb-8">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Danh sách người theo dõi</h1>
                  <p className="text-slate-600">Quản lý và tương tác với những người bạn đang theo dõi</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{filteredFollowers.length}</div>
                <div className="text-sm text-slate-600">người theo dõi</div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên người theo dõi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white/70"
                />
                {searchQuery && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex rounded-lg border border-blue-200 bg-white/70">
                    <Button
                      size="sm"
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none px-3 py-2"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "list" ? "default" : "ghost"}
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none px-3 py-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Tìm thấy <span className="font-semibold text-blue-600">{filteredFollowers.length}</span> người
            {searchQuery && (
              <span> cho từ khóa "<span className="font-semibold text-slate-800">{searchQuery}</span>"</span>
            )}
          </p>
        </div>

        {/* Followers Grid */}
        {filteredFollowers.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-3xl shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {searchQuery ? "Không tìm thấy kết quả" : "Chưa có người theo dõi"}
              </h3>
              <p className="text-slate-500">
                {searchQuery 
                  ? "Thử thay đổi từ khóa tìm kiếm"
                  : "Hãy chia sẻ những bài viết thú vị để thu hút nhiều người theo dõi hơn"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredFollowers.map((follower) => (
              <FollowCard key={follower.accountId} follower={follower} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}