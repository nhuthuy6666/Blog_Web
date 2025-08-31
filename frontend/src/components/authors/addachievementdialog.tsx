"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Award, BookOpen, Trophy, Star, Plus, Medal } from "lucide-react";


interface AddAchievementDialogProps {
  open: boolean;
  onClose: () => void;
  accountId: string;
  accountAchievements: IAchievement[];
}

const typeOptions = [
  { value: "award", label: "Giải thưởng", icon: Award, color: "text-yellow-500" },
  { value: "publication", label: "Ấn phẩm", icon: BookOpen, color: "text-blue-500" },
  { value: "title", label: "Danh hiệu", icon: Medal, color: "text-purple-500" },
  { value: "achievement", label: "Thành tựu", icon: Star, color: "text-green-500" },
];

export default function AddAchievementDialog({
  open,
  onClose,
  accountId,
  accountAchievements,
}: AddAchievementDialogProps) {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setAchievements(accountAchievements);
  }, [accountAchievements, open]);
  
  // thêm mới
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/achievements/${accountId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      });
      if (!res.ok) throw new Error("Failed to create achievement");

      const newAchievement: IAchievement = await res.json();

      setAchievements((prev) => [...prev, newAchievement]);
      setName("");
      setType("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (achievementId: string) => {
    setDeletingId(achievementId);
    try {
      const res = await fetch(`http://localhost:5001/achievements/${achievementId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete achievement");

      setAchievements((prev) => prev.filter((a) => a.achievementId !== achievementId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeOption = (type: string) => {
    return typeOptions.find((opt) => opt.value === type) || typeOptions[0];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-blue-100 rounded-3xl shadow-2xl p-0 sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Trophy className="w-6 h-6" />
              </div>
              Quản lý thành tích
            </DialogTitle>
            <p className="text-blue-100 mt-2">Thêm và quản lý các thành tích, giải thưởng của bạn</p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Danh sách thành tích */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              Thành tích hiện tại ({achievements.length})
            </h3>
            
            <div className="max-h-32 overflow-y-auto space-y-3 bg-gradient-to-br from-blue-50/50 to-green-50/50 p-4 rounded-2xl border border-blue-100">
              {achievements.length > 0 ? (
                achievements.map((a) => {
                  const typeOption = getTypeOption(a.type);
                  const IconComponent = typeOption.icon;
                  
                  return (
                    <div
                      key={a.achievementId}
                      className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-lg bg-gradient-to-br from-white to-gray-50 ${typeOption.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{a.name}</h4>
                          <p className="text-sm text-slate-600">{typeOption.label}</p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(a.achievementId)}
                        disabled={deletingId === a.achievementId}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        {deletingId === a.achievementId ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 mb-2">Chưa có thành tích nào</p>
                  <p className="text-sm text-slate-400">Hãy thêm thành tích đầu tiên của bạn</p>
                </div>
              )}
            </div>
          </div>

          {/* Form thêm mới */}
          <div className="space-y-4 bg-gradient-to-br from-blue-50/30 to-green-50/30 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-500" />
              Thêm thành tích mới
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Tên thành tích
                </label>
                <Input
                  placeholder="Nhập tên thành tích..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Loại thành tích
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border-blue-200 rounded-xl focus:border-blue-400 focus:ring-blue-200">
                    <SelectValue placeholder="Chọn loại thành tích" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm border-blue-100 rounded-xl shadow-xl">
                    {typeOptions.map((opt) => (
                      <SelectItem 
                        key={opt.value} 
                        value={opt.value}
                        className="hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <opt.icon className={`w-4 h-4 ${opt.color}`} />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex-shrink-0 flex justify-end space-x-3 pt-4 border-t border-blue-100 bg-white/50 -mx-6 px-6 pb-6 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                onClose();
                window.location.reload();
              }}
              className="border-blue-200 text-slate-600 hover:bg-blue-50 rounded-xl px-6 transition-colors"
            >
              Áp dụng
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !name || !type}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Thêm thành tích
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}