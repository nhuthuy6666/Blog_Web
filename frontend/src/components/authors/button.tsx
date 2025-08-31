"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import { Button } from "@/components/ui/button";
import { Edit3, Settings, Users, LogOut, Bookmark, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import LogoutModal from "@/components/authors/logoutmodal";
import EditAccountModal from "@/components/authors/editaccountmodal";
import FollowButton from "@/components/action/followbtn";

interface EditAccountAuthorModalProps {
  id: string;
  account: IAccount | null;
  authorId: string;
  defaultName: string | null;
  defaultEmail: string | null;
  defaultBusiness: string | null;
  defaultAddress: string | null;
  defaultDescribe: string | null;
  defaultLink: string | null;
  followers: number;                                
  onFollowersChange: (val: number) => void;
}

export default function ButtonPage({ id, authorId, defaultName, defaultEmail, defaultBusiness, defaultAddress, defaultDescribe, defaultLink, account, followers, onFollowersChange}: EditAccountAuthorModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const isOwner = user?.accountId === id;

  return (
    <div className="flex flex-col w-full sm:w-auto lg:flex-row gap-2 mt-4 lg:mt-0">
      {isOwner ? (
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex-1 sm:flex-none text-sm" onClick={() => setShowEditModal(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Chỉnh sửa
          </Button>

          {/* Dropdown Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 rounded-xl">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <Link href={`/follow/${user?.accountId}`} passHref>
                <DropdownMenuItem asChild>
                  <span>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Theo dõi
                  </span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/save/${user?.accountId}`} passHref>
                <DropdownMenuItem asChild>
                  <span>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Đã lưu
                  </span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/changepassword/${user?.accountId}`} passHref>
                <DropdownMenuItem asChild>
                  <span>
                    <Lock className="w-4 h-4 mr-2" />
                    Đổi mật khẩu
                  </span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-700"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <FollowButton account={account?? null} onLikeChange={onFollowersChange} />
      )}

      {/* Logout Modal */}
      <LogoutModal open={showLogoutModal} onOpenChange={setShowLogoutModal} />

      <EditAccountModal 
        open={showEditModal} 
        onOpenChange={setShowEditModal} 
        accountId={user?.accountId ?? ""} 
        authorId={authorId?? ""}
        defaultName={defaultName}
        defaultEmail={defaultEmail}
        defaultBusiness={defaultBusiness}
        defaultAddress={defaultAddress}
        defaultDescribe={defaultDescribe}
        defaultLink={defaultLink}
      />
    </div>
  );
}
