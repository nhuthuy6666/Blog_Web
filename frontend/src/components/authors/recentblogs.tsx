import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Plus, Eye, Heart, MessageCircle, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import AllBlogsModal from "@/components/authors/allblogsmodel";
import { formatNumber } from "@/lib/formatNumber";
import { getUser } from "@/lib/getUser";
import CreateBlogDialog from "@/components/blogs/createblogdialog";
import { handleView } from "@/lib/handleView";
import { useRouter } from "next/navigation";

export default function RecentBlogPage({ id }: { id: string }){
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [openAll, setOpenAll] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [openCreate, setOpenCreate] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:5001/blogs")
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    const recentPosts = blogs.filter(blog => blog.Account.accountId == id);

    useEffect(() => {
      setUser(getUser());
    }, []);

    const isOwner = user?.accountId === id;

    return(
        <div className="md:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center me-2">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                    Blog
                  </h3>
                  <div className="flex gap-2">
                    {isOwner && (
                      <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => setOpenCreate(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Viết bài
                    </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 rounded-xl" onClick={() => setOpenAll(true)}>
                      Xem tất cả
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recentPosts.length > 0 ? (
                    recentPosts.slice(0, 3).map((post, index) => (
                      <div key={index} onClick={() => {
                          handleView(post);
                          router.push(`/blogdetails/${post.blogId}`);
                        }} 
                        className="cursor-pointer">
                        <div className="group p-4 rounded-xl border border-blue-100 hover:bg-blue-50/50 transition-all duration-200 hover:border-blue-200 cursor-pointer">
                            <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors mb-2">
                                {post.title}
                            </h4>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {formatNumber(post.views)}
                                </span>
                                <span className="flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {formatNumber(post.likes)}
                                </span>
                                <span className="flex items-center">
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    {formatNumber(post.comments)}
                                </span>
                                <span className="ml-auto">
                                    {new Date(post.postDate).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-blue-500" />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-2">
                        Chưa có bài viết nào
                      </h4>
                      {isOwner && (
                        <>
                          <p className="text-slate-500 mb-6 max-w-sm">
                            Bạn chưa có bài viết nào. Hãy bắt đầu viết bài đầu tiên để chia sẻ những ý tưởng của mình!
                          </p>
                          <Button 
                          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          onClick={() => setOpenCreate(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                              Viết bài đầu tiên
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dialog tạo blog */}
            <CreateBlogDialog
              open={openCreate}
              onClose={() => setOpenCreate(false)}
              accountId={id}
            />

            {/* Modal hiển thị tất cả blogs */}
            <AllBlogsModal open={openAll} onClose={() => setOpenAll(false)} blogs={recentPosts} />
        </div>
    )
}