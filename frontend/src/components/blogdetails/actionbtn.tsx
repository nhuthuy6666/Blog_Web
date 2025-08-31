import { Button } from "@/components/ui/button";
import { Eye, Share2, Bookmark } from "lucide-react";
import { formatNumber } from "@/lib/formatNumber";
import LikeButton from "@/components/action/likebtn";
import SaveButton from "@/components/action/savebtn";


export default function ActionBtn({ blogFetch }: { blogFetch: IBlog }) {

  const totalViews = formatNumber(blogFetch.views);

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all group"
      >
        <Eye className="w-4 h-4 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="font-semibold">{totalViews}</span>
        <span className="text-xs text-slate-500 ml-1">views</span>
      </Button>

      <LikeButton blog={blogFetch}/>

      <SaveButton blog={blogFetch} />

      <Button
        variant="outline"
        size="sm"
        className="rounded-xl border-green-200 hover:bg-green-50 hover:border-green-300 transition-all group"
      >
        <Share2 className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
}
