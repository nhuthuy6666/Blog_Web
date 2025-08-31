"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, BookOpen, TrendingUp, Award, Medal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/getUser";
import AddAchievementDialog from "@/components/authors/addachievementdialog";
import AddSkillDialog from "@/components/authors/addskilldialog";

export default function AchievementPage({ id, acc }: { id: string, acc: IAccount | null }){

    const [achievements, setAchievements] = useState<IAchievement[]>([]);
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [openAchievement, setOpenAchievement] = useState(false);
    const [openSkill, setOpenSkill] = useState(false);
    const [achievementsLoading, setAchievementsLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(true);

    useEffect(() => {
        setUser(getUser());
    }, []);

    useEffect(() => {
        setAchievementsLoading(true);
        fetch("http://localhost:5001/achievements")
            .then(res => res.json())
            .then(data => setAchievements(data))
            .finally(() => setAchievementsLoading(false));
    }, []);

    useEffect(() => {
        setSkillsLoading(true);
        fetch("http://localhost:5001/skills")
            .then(res => res.json())
            .then(data => setSkills(data))
            .finally(() => setSkillsLoading(false));
    }, [])

    useEffect(() => {
        if (!id) return;
          fetch(`http://localhost:5001/accounts/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch account");
              return res.json();
            })
            .then((data) => setAccount(data))
            .catch((err) => {
              console.error(err);
            });
      }, [id]);

    const isOwner = user?.accountId === id;

    const accountAchievements = achievements.filter(a => a.Account.accountId == id);
    const accountSkills = skills.filter(s => s.Author.authorId == account?.Author.authorId)

    const getIconByType = (type: string) => {
    switch (type) {
        case "award":
            return <Award className="w-5 h-5 text-yellow-500" />;
        case "publication":
            return <BookOpen className="w-5 h-5 text-blue-500" />;
        case "title":
            return <Medal className="w-5 h-5 text-purple-500" />;
        case "achievement":
            return <Star className="w-5 h-5 text-green-500" />;
        default:
            return <Star className="w-5 h-5 text-gray-400" />; 
        }
    };

    const colors = [
        "from-blue-500 to-blue-600",   
        "from-green-500 to-green-600", 
        "from-purple-500 to-pink-600" 
    ];

    return(
        <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Thành tích
                  </h3>
                  {isOwner &&(
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                        onClick={() => setOpenAchievement(true)}
                    >
                        <Plus className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                    {achievementsLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-3"></div>
                            <p className="text-gray-500 text-sm">Đang tải thành tích...</p>
                        </div>
                    ) : accountAchievements.length > 0 ? (
                        accountAchievements.map((a, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">{a.name}</span>
                                {getIconByType(a.type)}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Chưa có thành tích nào</p>
                            <p className="text-gray-400 text-xs mt-1">Hãy tiếp tục phát triển để có những thành tích đầu tiên!</p>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Kỹ năng
                  </h3>
                  {isOwner &&(
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                        onClick={() => setOpenSkill(true)}
                    >
                        <Plus className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                    {skillsLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full mx-auto mb-3"></div>
                            <p className="text-gray-500 text-sm">Đang tải kỹ năng...</p>
                        </div>
                    ) : accountSkills.length > 0 ? (
                        accountSkills.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600">{skill.name}</span>
                                    <span className="text-blue-600">{skill.percent}%</span>
                                </div>
                                <div className="w-full bg-blue-100 rounded-full h-2">
                                    <div className={`bg-gradient-to-r ${colors[index % colors.length]} h-2 rounded-full`} style={{ width: `${skill.percent}%` }}></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Chưa có kỹ năng nào được thêm</p>
                            <p className="text-gray-400 text-xs mt-1">Hãy bổ sung kỹ năng để thể hiện năng lực của bạn!</p>
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
            <AddAchievementDialog
                open={openAchievement}
                onClose={() => setOpenAchievement(false)}
                accountId={id}
                accountAchievements={accountAchievements}
            />

            <AddSkillDialog 
                open={openSkill}
                onClose={() => setOpenSkill(false)}
                authorId={account?.Author.authorId?? ""}
                accountSkills={accountSkills}
            />
        </div>
    )
}