import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Star, Users, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/formatNumber";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";

export default function SidePage({blogFetch, blogs}: {blogFetch: IBlog, blogs: IBlog[]}){
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        setUser(getUser());
    }, []);

    const totalViews = formatNumber(blogFetch.views);
    const totalLikes = formatNumber(blogFetch.likes);
    const totalComments = formatNumber(blogFetch.comments);
    const totalShares = formatNumber(blogFetch.shares);
    const totalfollower = formatNumber(blogFetch?.Account?.followers);
    const totalBlogs = formatNumber(blogs.filter(b => b.Account.accountId === blogFetch?.Account.accountId).length);
    return(
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Author Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-xl sm:rounded-2xl shadow-lg">
                <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
                        Tác giả
                    </h3>
                    <div className="text-center space-y-2 sm:space-y-3">
                        <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-lg sm:text-xl font-bold mx-auto shadow-lg">
                            {blogFetch?.Account?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <Link href={`/author/${blogFetch.Account.accountId}`} className="font-semibold text-slate-800 text-sm sm:text-base hover:text-blue-600 transition-colors">{blogFetch?.Account?.name}</Link>
                            <div className="text-xs sm:text-sm text-slate-600">{blogFetch?.Account?.Author?.business}</div>
                        </div>
                        <div className="flex justify-center space-x-4 text-xs sm:text-sm">
                            <div className="text-center">
                                <div className="font-semibold text-slate-800">{totalBlogs}</div>
                                    <div className="text-slate-600">Bài viết</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-slate-800">{totalfollower}</div>
                                    <div className="text-slate-600">Followers</div>
                                </div>
                        </div>
                        <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 rounded-lg sm:rounded-xl text-xs sm:text-sm" disabled={user?.accountId === blogFetch?.Account?.accountId}>
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Theo dõi
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-xl sm:rounded-2xl shadow-lg">
                <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                        Thống kê
                    </h3>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Lượt xem</span>
                            <span className="font-semibold text-slate-800">{totalViews}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Lượt thích</span>
                            <span className="font-semibold text-slate-800">{totalLikes}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Bình luận</span>
                            <span className="font-semibold text-slate-800">{totalComments}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Chia sẻ</span>
                            <span className="font-semibold text-slate-800">{totalShares}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}