import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/getUser";
import { ArrowLeft, Edit, Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteBlogDialog from "@/components/blogs/deleteblogdialog";
import EditBlogDialog from "@/components/blogs/editblogdialog";

export default function NavigationPage({ id, blogId, blogFetch }: { id: string, blogId: number, blogFetch: IBlog }) {
  const [user, setUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 mt-4 sm:mt-6 gap-3 sm:gap-4">
      
      {/* Back button */}
      <Button 
        variant="outline" 
        className="border-blue-200 hover:bg-blue-50 rounded-lg sm:rounded-xl group w-full sm:w-auto text-sm sm:text-base"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </Button>

      {/* Action buttons */}
      {user && user.accountId === id && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        
          {/* Edit button */}
          <Button 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg sm:rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setEditOpen(true)}
          >
            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Chỉnh sửa bài viết
          </Button>

          {/* Delete button */}
          <Button 
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg sm:rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-sm sm:text-base"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Xóa bài viết
          </Button>
        </div>
      )}
      <EditBlogDialog
      blogId={blogId}
      blog={blogFetch}
      open={editOpen}
      onOpenChange={setEditOpen}
      />
      <DeleteBlogDialog 
        blogId={blogId} 
        accountId={id} 
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  )
}
