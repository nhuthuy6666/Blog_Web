"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Plus, Activity, Star, Code } from "lucide-react";

interface AddSkillDialogProps {
  open: boolean;
  onClose: () => void;
  authorId: string;
  accountSkills: ISkill[];
}

export default function AddSkillDialog({
  open,
  onClose,
  authorId,
  accountSkills,
}: AddSkillDialogProps) {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setSkills(accountSkills);
  }, [accountSkills]);

  const handleSubmit = async () => {
    if (!name || !percent) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/skills/${authorId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, percent }),
      });
      if (!res.ok) throw new Error("Failed to create skill");

      const newSkill: ISkill = await res.json();
      setSkills((prev) => [...prev, newSkill]);
      setName("");
      setPercent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    setDeletingId(skillId);
    try {
      const res = await fetch(`http://localhost:5001/skills/${skillId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete skill");
      setSkills((prev) => prev.filter((s) => s.skillId !== skillId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  const getSkillLevel = (percent: number) => {
    if (percent >= 90) return { label: "Chuyên gia", color: "text-purple-600" };
    if (percent >= 80) return { label: "Thành thạo", color: "text-blue-600" };
    if (percent >= 70) return { label: "Khá tốt", color: "text-green-600" };
    if (percent >= 60) return { label: "Trung bình", color: "text-yellow-600" };
    return { label: "Cơ bản", color: "text-gray-600" };
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-sm border-blue-100 rounded-3xl shadow-2xl p-0 sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Activity className="w-6 h-6" />
              </div>
              Quản lý kỹ năng
            </DialogTitle>
            <p className="text-green-100 mt-2">Thêm và quản lý các kỹ năng chuyên môn của bạn</p>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Danh sách kỹ năng */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <Code className="w-5 h-5 text-green-500" />
              Kỹ năng hiện tại ({skills.length})
            </h3>
            
            <div className="max-h-32 overflow-y-auto space-y-3 bg-gradient-to-br from-green-50/50 to-blue-50/50 p-4 rounded-2xl border border-green-100">
              {skills.length > 0 ? (
                skills.map((s) => {
                  const skillLevel = getSkillLevel(parseInt(s.percent));
                  
                  return (
                    <div
                      key={s.skillId}
                      className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-white to-gray-50">
                          <Star className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{s.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-medium ${skillLevel.color}`}>
                              {skillLevel.label}
                            </span>
                            <span className="text-sm text-slate-600">• {s.percent}%</span>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${s.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(s.skillId)}
                        disabled={deletingId === s.skillId}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors ml-3"
                      >
                        {deletingId === s.skillId ? (
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
                    <Activity className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 mb-2">Chưa có kỹ năng nào</p>
                  <p className="text-sm text-slate-400">Hãy thêm kỹ năng đầu tiên của bạn</p>
                </div>
              )}
            </div>
          </div>

          {/* Form thêm mới */}
          <div className="space-y-4 bg-gradient-to-br from-green-50/30 to-blue-50/30 p-6 rounded-2xl border border-green-100">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-500" />
              Thêm kỹ năng mới
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Tên kỹ năng
                </label>
                <Input
                  placeholder="Ví dụ: ReactJS, Python, Photoshop..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border-green-200 rounded-xl focus:border-green-400 focus:ring-green-200 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Mức độ thành thạo (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Ví dụ: 85"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="bg-white/80 backdrop-blur-sm border-green-200 rounded-xl focus:border-green-400 focus:ring-green-200 transition-colors"
                />
                <div className="mt-2 text-xs text-slate-500 flex flex-wrap gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded">0-59%: Cơ bản</span>
                  <span className="bg-yellow-100 px-2 py-1 rounded">60-69%: Trung bình</span>
                  <span className="bg-green-100 px-2 py-1 rounded">70-79%: Khá tốt</span>
                  <span className="bg-blue-100 px-2 py-1 rounded">80-89%: Thành thạo</span>
                  <span className="bg-purple-100 px-2 py-1 rounded">90-100%: Chuyên gia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex-shrink-0 flex justify-end space-x-3 pt-4 border-t border-green-100 bg-white/50 -mx-6 px-6 pb-6 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                onClose();
                window.location.reload();
              }}
              className="border-green-200 text-slate-600 hover:bg-green-50 rounded-xl px-6 transition-colors"
            >
              Áp dụng
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !name || !percent}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Thêm kỹ năng
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}