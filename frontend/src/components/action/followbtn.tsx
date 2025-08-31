"use client";

import { Button } from "@/components/ui/button";
import { Users, UserCheck } from "lucide-react";
import { getUser } from "@/lib/getUser";
import { useEffect, useState } from "react";
import { handleFollowPlus } from "@/lib/handlefollow";
import { handleFollowSubtraction } from "@/lib/handlefollow";
import LoginDialog from "@/components/notice/logindialog";

interface FollowButtonProps {
  account: IAccount | null;
  onLikeChange?: (newFollows: number) => void;
}

export default function FollowButton({ account, onLikeChange }: FollowButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [follows, setFollows] = useState<number>(account?.followers ?? 0);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);

    if (u) {
      fetch(`http://localhost:5001/follows/${u.accountId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user follows");
          return res.json();
        })
        .then((data) => {
          if (data?.listAccount?.some((a: any) => a.accountId === account?.accountId)) {
            setIsFollowed(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [account?.accountId]);

  const handleToggleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();      
    e.stopPropagation();
    
    if (!user) {
      setLoginDialogOpen(true);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/follows/toggle/${user.accountId}/${account?.accountId}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Follow toggle failed");

      let updatedFollows = follows;
      
      if (isFollowed) {
        await handleFollowSubtraction(account);
          setFollows((prev) => Math.max(prev - 1, 0));
          updatedFollows = Math.max(follows - 1, 0);
          setIsFollowed(false);
      } else {
        await handleFollowPlus(account);
          setFollows((prev) => prev + 1);
          updatedFollows = follows + 1;
          setIsFollowed(true);
      }
      
      if (onLikeChange) onLikeChange(updatedFollows);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isFollowed ? (
        <Button
          onClick={handleToggleFollow}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg cursor-pointer"
        >
          <UserCheck className="w-4 h-4 mr-1" />
          Đã theo dõi
        </Button>
      ) : (
        <Button
          onClick={handleToggleFollow}
          variant="outline"
          className="w-full border-blue-200 hover:bg-blue-50 rounded-xl text-sm cursor-pointer"
        >
          <Users className="w-4 h-4 mr-2" />
          Theo dõi
        </Button>
      )}
      {/* dialog login */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </div>
  );
}
