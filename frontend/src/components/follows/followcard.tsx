import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, PenTool, Mail, Calendar, UserMinus } from "lucide-react";

export default function FollowCard({ follower }: { follower: IAccount }) {
  return (
    <Link href={`/author/${follower.accountId}`} className="block">
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg hover:shadow-xl hover:bg-blue-100/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          {/* Avatar and Main Info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg">
                {follower.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">{follower.name}</h3>
              <p className="text-slate-600 text-sm flex items-center mb-1">
                <User className="w-3 h-3 mr-1 text-blue-500 flex-shrink-0" />
                <span className="truncate">{follower.Author.business}</span>
              </p>
              <p className="text-slate-500 text-xs flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-blue-500 flex-shrink-0" />
                <span className="truncate">{follower.Author.address}</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            <PenTool className="inline w-3 h-3 mr-1 text-blue-500 flex-shrink-0" />
            {follower.Author.describe}
          </p>

          {/* Contact Info */}
          <div className="mb-4 space-y-1">
            <div className="flex items-center text-xs text-slate-600">
              <Mail className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" />
              <span className="truncate">{follower.email}</span>
            </div>
            <div className="flex items-center text-xs text-slate-600">
              <Calendar className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" />
              Tham gia từ {new Date(follower.createdAt).toLocaleDateString("vi-VN")}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
