import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from 'src/modules/skills/schemas/skill.schema';
import { Author, AuthorDocument } from 'src/modules/authors/schemas/author.schema';

@Injectable()
export class SkillSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.skillModel.countDocuments();
    if (count > 0) return;

    console.log('Seeding Skills...');

    const authors = await this.authorModel.find().lean();

    const skillData = [
      { skillId: 'S01', name: 'Nấu ăn', percent: '95', authorRefId: 'A01' },
      { skillId: 'S02', name: 'Sáng tạo món mới', percent: '90', authorRefId: 'A01' },
      { skillId: 'S03', name: 'Quản lý bếp', percent: '85', authorRefId: 'A01' },

      { skillId: 'S04', name: 'Viết báo', percent: '92', authorRefId: 'A02' },
      { skillId: 'S05', name: 'Phỏng vấn', percent: '88', authorRefId: 'A02' },
      { skillId: 'S06', name: 'Nghiên cứu thông tin', percent: '85', authorRefId: 'A02' },

      { skillId: 'S07', name: 'Sáng tác văn học', percent: '93', authorRefId: 'A03' },
      { skillId: 'S08', name: 'Biên tập nội dung', percent: '87', authorRefId: 'A03' },
      { skillId: 'S09', name: 'Phân tích nhân vật', percent: '85', authorRefId: 'A03' },

      { skillId: 'S10', name: 'Giảng dạy', percent: '95', authorRefId: 'A04' },
      { skillId: 'S11', name: 'Nghiên cứu khoa học', percent: '90', authorRefId: 'A04' },
      { skillId: 'S12', name: 'Soạn giáo án', percent: '88', authorRefId: 'A04' },

      { skillId: 'S13', name: 'Thiết kế thời trang', percent: '94', authorRefId: 'A05' },
      { skillId: 'S14', name: 'May mặc', percent: '90', authorRefId: 'A05' },
      { skillId: 'S15', name: 'Vẽ phác thảo', percent: '88', authorRefId: 'A05' },

      { skillId: 'S16', name: 'Chụp ảnh', percent: '96', authorRefId: 'A06' },
      { skillId: 'S17', name: 'Chỉnh sửa ảnh', percent: '92', authorRefId: 'A06' },
      { skillId: 'S18', name: 'Xử lý ánh sáng', percent: '89', authorRefId: 'A06' },

      { skillId: 'S19', name: 'Dạy tiếng Anh', percent: '95', authorRefId: 'A07' },
      { skillId: 'S20', name: 'Dịch thuật', percent: '90', authorRefId: 'A07' },
      { skillId: 'S21', name: 'Luyện phát âm', percent: '88', authorRefId: 'A07' },

      { skillId: 'S22', name: 'Kinh doanh', percent: '94', authorRefId: 'A08' },
      { skillId: 'S23', name: 'Đàm phán', percent: '91', authorRefId: 'A08' },
      { skillId: 'S24', name: 'Quản lý tài chính', percent: '89', authorRefId: 'A08' },

      { skillId: 'S25', name: 'Khám bệnh', percent: '95', authorRefId: 'A09' },
      { skillId: 'S26', name: 'Phẫu thuật', percent: '90', authorRefId: 'A09' },
      { skillId: 'S27', name: 'Tư vấn y khoa', percent: '88', authorRefId: 'A09' },

      { skillId: 'S28', name: 'Marketing', percent: '93', authorRefId: 'A10' },
      { skillId: 'S29', name: 'Phân tích dữ liệu', percent: '89', authorRefId: 'A10' },
      { skillId: 'S30', name: 'Viết nội dung quảng cáo', percent: '87', authorRefId: 'A10' },

      { skillId: 'S31', name: 'Lập trình', percent: '95', authorRefId: 'A11' },
      { skillId: 'S32', name: 'Phân tích hệ thống', percent: '91', authorRefId: 'A11' },
      { skillId: 'S33', name: 'Quản trị cơ sở dữ liệu', percent: '88', authorRefId: 'A11' },

      { skillId: 'S34', name: 'Viết blog', percent: '94', authorRefId: 'A12' },
      { skillId: 'S35', name: 'Chụp ảnh du lịch', percent: '90', authorRefId: 'A12' },
      { skillId: 'S36', name: 'Quay video', percent: '87', authorRefId: 'A12' },

      { skillId: 'S37', name: 'Huấn luyện thể hình', percent: '95', authorRefId: 'A13' },
      { skillId: 'S38', name: 'Tư vấn dinh dưỡng', percent: '91', authorRefId: 'A13' },
      { skillId: 'S39', name: 'Lên kế hoạch tập luyện', percent: '89', authorRefId: 'A13' },
    ];

    const skillsData = skillData.map((skill) => {
      const author = authors.find((a) => a.authorId === skill.authorRefId);
      if (!author) return null;
      return {
        Author: author._id,
        skillId: skill.skillId,
        name: skill.name,
        percent: skill.percent,
      };
    }).filter(Boolean);

    await this.skillModel.insertMany(skillsData);
    console.log('Skills seeded!');
  }
}
