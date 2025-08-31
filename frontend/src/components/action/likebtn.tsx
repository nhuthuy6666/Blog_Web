"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/getUser";
import { handleLikePlus } from "@/lib/handleLike";
import { handleLikeSubtraction } from "@/lib/handleLike";
import { formatNumber } from "@/lib/formatNumber";
import LoginDialog from "@/components/notice/logindialog";

interface LikeButtonProps {
  blog: IBlog;
  small?: boolean;
  onLikeChange?: (newLikes: number) => void;
}

export default function LikeButton({ blog, small = false, onLikeChange }: LikeButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u) {
      fetch(`http://localhost:5001/likes/${u.accountId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.blogList?.some((b: any) => b.blogId === blog.blogId)) {
            setIsLiked(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [blog.blogId]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); 

    if (!user) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/likes/toggle/${user.accountId}/${blog.blogId}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Toggle like failed");
      let updatedLikes = likes;

      if (isLiked) {
        await handleLikeSubtraction(blog);
        setLikes((prev) => Math.max(prev - 1, 0));
        updatedLikes = Math.max(likes - 1, 0);
        setIsLiked(false);
      } else {
        await handleLikePlus(blog, likes);
        setLikes((prev) => prev + 1);
        updatedLikes = likes + 1;
        setIsLiked(true);
      }

      if (onLikeChange) onLikeChange(updatedLikes);

    } catch (err) {
      console.error(err);
    }
  };

  if (small) {
    return (
      <>
        <Button
          size="sm"
          variant="outline"
          className={`rounded-xl transition-all cursor-pointer group 
          ${
            isLiked
              ? "border-pink-400 bg-pink-50 text-pink-600"
              : "border-pink-200 hover:bg-pink-50 hover:border-pink-300 text-pink-600"
          }`}
          onClick={handleToggleLike}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`}
          />
        </Button>

        {/* dialog login */}
        <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleToggleLike}
        variant="outline"
        size="sm"
        className={`rounded-xl transition-all cursor-pointer group 
          ${
            isLiked
              ? "border-pink-400 bg-pink-50 text-pink-600"
              : "border-pink-200 hover:bg-pink-50 hover:border-pink-300 text-pink-600"
          }`}
      >
        <Heart
          className={`w-4 h-4 mr-2 group-hover:scale-110 transition-transform 
            ${isLiked ? "fill-pink-500 text-pink-500" : ""}`}
        />
        <span className="font-semibold">{formatNumber(likes)}</span>
        <span className="text-xs text-pink-500 ml-1">likes</span>
      </Button>

      {/* dialog login */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  );
}
