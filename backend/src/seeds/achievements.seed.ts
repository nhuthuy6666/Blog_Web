import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/modules/accounts/schemas/account.schema";
import { Achievement, AchievementDocument } from "src/modules/achievements/schemas/achievement.schema";

@Injectable()
export class AchievementSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Achievement.name) private achievementModel: Model<AchievementDocument>
  ) {}

  async onModuleInit() {
    const count = await this.achievementModel.countDocuments().exec();

    if (count === 0) {
      console.log("Seeding Achievements...");

      const accounts = await this.accountModel.find().lean();
      const achievementsData = [
        { achievementId: "ACM01", name: "Vô địch cuộc thi ẩm thực toàn quốc", type: "award", accountRefId: "ACC01" },
        { achievementId: "ACM02", name: "Ra mắt sách nấu ăn bán chạy nhất", type: "publication", accountRefId: "ACC01" },
        { achievementId: "ACM03", name: "Đầu bếp số 1 Hà Nội", type: "title", accountRefId: "ACC01" },

        { achievementId: "ACM04", name: "Phóng viên xuất sắc của năm", type: "award", accountRefId: "ACC02" },
        { achievementId: "ACM05", name: "Đưa tin nhanh nhất sự kiện quốc tế", type: "award", accountRefId: "ACC02" },
        { achievementId: "ACM06", name: "Phóng sự điều tra đoạt giải A", type: "award", accountRefId: "ACC02" },

        { achievementId: "ACM07", name: "Xuất bản tiểu thuyết bán chạy", type: "publication", accountRefId: "ACC03" },
        { achievementId: "ACM08", name: "Giải thưởng văn học quốc gia", type: "award", accountRefId: "ACC03" },
        { achievementId: "ACM09", name: "Top 10 tác giả yêu thích", type: "title", accountRefId: "ACC03" },

        { achievementId: "ACM10", name: "Giảng viên xuất sắc", type: "award", accountRefId: "ACC04" },
        { achievementId: "ACM11", name: "Phát triển chương trình giảng dạy mới", type: "achievement", accountRefId: "ACC04" },
        { achievementId: "ACM12", name: "Hướng dẫn nghiên cứu đạt giải quốc tế", type: "award", accountRefId: "ACC04" },

        { achievementId: "ACM13", name: "Bộ sưu tập thời trang quốc tế", type: "achievement", accountRefId: "ACC05" },
        { achievementId: "ACM14", name: "Giải NTK sáng tạo nhất", type: "award", accountRefId: "ACC05" },
        { achievementId: "ACM15", name: "Trình diễn tại Tuần lễ Thời trang Paris", type: "achievement", accountRefId: "ACC05" },

        { achievementId: "ACM16", name: "Triển lãm ảnh cá nhân", type: "achievement", accountRefId: "ACC06" },
        { achievementId: "ACM17", name: "Ảnh đoạt giải quốc tế", type: "award", accountRefId: "ACC06" },
        { achievementId: "ACM18", name: "Top 50 nhiếp ảnh gia sáng tạo", type: "title", accountRefId: "ACC06" },

        { achievementId: "ACM19", name: "Giáo viên được yêu thích nhất trường", type: "award", accountRefId: "ACC07" },
        { achievementId: "ACM20", name: "Soạn giáo trình tiếng Anh sáng tạo", type: "achievement", accountRefId: "ACC07" },
        { achievementId: "ACM21", name: "Học viên đạt điểm IELTS cao nhất", type: "achievement", accountRefId: "ACC07" },

        { achievementId: "ACM22", name: "Thành lập công ty thành công", type: "achievement", accountRefId: "ACC08" },
        { achievementId: "ACM23", name: "Doanh nhân trẻ xuất sắc", type: "award", accountRefId: "ACC08" },
        { achievementId: "ACM24", name: "Mở rộng thị trường ra quốc tế", type: "achievement", accountRefId: "ACC08" },

        { achievementId: "ACM25", name: "Ca phẫu thuật thành công cứu sống bệnh nhân", type: "achievement", accountRefId: "ACC09" },
        { achievementId: "ACM26", name: "Bác sĩ tận tâm được bệnh nhân yêu quý", type: "award", accountRefId: "ACC09" },
        { achievementId: "ACM27", name: "Nghiên cứu y học đăng trên tạp chí quốc tế", type: "publication", accountRefId: "ACC09" },

        { achievementId: "ACM28", name: "Chiến dịch marketing đạt doanh số kỷ lục", type: "achievement", accountRefId: "ACC10" },
        { achievementId: "ACM29", name: "Top 10 chuyên viên marketing sáng tạo", type: "award", accountRefId: "ACC10" },
        { achievementId: "ACM30", name: "Tổ chức thành công sự kiện thương hiệu lớn", type: "achievement", accountRefId: "ACC10" },

        { achievementId: "ACM31", name: "Phát triển phần mềm được 1 triệu lượt tải", type: "achievement", accountRefId: "ACC11" },
        { achievementId: "ACM32", name: "Giải thưởng lập trình viên xuất sắc", type: "award", accountRefId: "ACC11" },
        { achievementId: "ACM33", name: "Đóng góp mã nguồn mở nổi bật", type: "achievement", accountRefId: "ACC11" },

        { achievementId: "ACM34", name: "Khám phá 50 quốc gia trên thế giới", type: "achievement", accountRefId: "ACC12" },
        { achievementId: "ACM35", name: "Blog du lịch đạt 1 triệu lượt xem", type: "achievement", accountRefId: "ACC12" },
        { achievementId: "ACM36", name: "Giải thưởng blogger ảnh đẹp nhất", type: "award", accountRefId: "ACC12" },

        { achievementId: "ACM37", name: "Huấn luyện thành công 100 học viên giảm cân", type: "achievement", accountRefId: "ACC13" },
        { achievementId: "ACM38", name: "Giải thưởng HLV thể hình xuất sắc", type: "award", accountRefId: "ACC13" },
        { achievementId: "ACM39", name: "Tham gia thi đấu thể hình quốc gia", type: "achievement", accountRefId: "ACC13" },
      ];

      const achievementsToInsert = achievementsData.map(acc => {
        const account = accounts.find(a => a.accountId === acc.accountRefId);
        return {
          ...acc,
          Account: account?._id, 
        };
      });

      await this.achievementModel.insertMany(achievementsToInsert);
      console.log("Achievements seeded!");
    }
  }
}
