"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser } from "@/lib/getUser";
import { 
  Search,
  Bookmark,
  BookOpen,
  Grid3X3,
  List,
  X,
  Users
} from "lucide-react";
import SaveCard from "@/components/saves/savecard";

export default function SaveClient({ id }: { id: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [saveBlogs, setSaveBlogs] = useState<ISave | null>(null)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5001/saves/${id}`)
      .then(res => res.json())
      .then(data => setSaveBlogs(data));
  }, [])

  const filteredBlogs = saveBlogs?.listBlog?.filter(blog =>
    [blog.title, blog.Account.name].some(field =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )?? [];

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
          <p className="text-red-500">Bạn không có quyền xem danh sách bài viết đã lưu của người dùng này.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-3xl shadow-xl mb-8">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Bài viết đã lưu</h1>
                  <p className="text-slate-600">Quản lý và tìm kiếm các bài viết yêu thích</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{filteredBlogs.length}</div>
                <div className="text-sm text-slate-600">bài viết</div>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white/70"
                />
                {searchTerm && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSearchTerm("")}
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

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-3xl shadow-lg">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {searchTerm ? "Không tìm thấy bài viết" : "Chưa có bài viết đã lưu"}
              </h3>
              <p className="text-slate-500">
                {searchTerm 
                  ? "Thử thay đổi từ khóa tìm kiếm"
                  : "Bắt đầu lưu những bài viết yêu thích để xem lại sau"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredBlogs.map((blog) => (
              <SaveCard key={blog.blogId} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}