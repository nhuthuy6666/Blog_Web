import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "src/modules/blogs/schemas/blog.schema";
import { Account, AccountDocument } from "src/modules/accounts/schemas/account.schema";

@Injectable()
export class BlogSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.blogModel.countDocuments().exec();

    if (count === 0) {
      console.log("Seeding Blogs...");
      const accounts = await this.accountModel.find().lean();

      const blogsData = [
        {
          blogId: 1,
          title: "Bí quyết nấu phở bò thơm ngon như nhà hàng",
          postDate: new Date("2025-08-10"),
          content: "Xin chào mọi người! Tôi là Huy Nguyễn Huỳnh Thanh – đầu bếp chính tại CMMB. Hôm nay, tôi muốn chia sẻ công thức phở bò mà tôi đã đúc kết sau nhiều năm làm việc trong bếp. Bí quyết nằm ở việc hầm xương bò trong ít nhất 8 tiếng, kết hợp với quế, hồi, gừng nướng để tạo nên hương thơm đặc trưng. Thịt bò nên được thái mỏng và trần nhanh để giữ được độ mềm ngọt. Hy vọng công thức này sẽ giúp bạn có một tô phở ngon lành ngay tại nhà. Chúc mọi người thành công!",
          likes: 428,
          views: 5120,
          comments: 63,
          shares: 24,
          accountRefId: "ACC01"
        },
        {
          blogId: 2,
          title: "Kỹ năng phỏng vấn để có bài báo chất lượng",
          postDate: new Date("2025-07-22"),
          content: "Xin chào các bạn, tôi là Ngân Trương Thanh – nhà báo tại toà soạn BBM. Khi phỏng vấn nhân vật, điều quan trọng nhất là tạo không khí thoải mái để họ sẵn sàng chia sẻ. Trước khi đến buổi phỏng vấn, bạn nên nghiên cứu kỹ về nhân vật, chuẩn bị câu hỏi mở và lắng nghe nhiều hơn là nói. Đây là cách để bài báo của bạn vừa chân thật vừa sâu sắc.",
          likes: 310,
          views: 4200,
          comments: 47,
          shares: 19,
          accountRefId: "ACC02"
        },
        {
          blogId: 3,
          title: "Làm thế nào để viết tiểu thuyết cuốn hút người đọc",
          postDate: new Date("2025-08-01"),
          content: "Xin chào, tôi là Mai Dương Thị – một nhà văn yêu thích khám phá cuộc sống. Một cuốn tiểu thuyết hay luôn bắt đầu từ ý tưởng mạnh mẽ. Hãy xây dựng nhân vật với chiều sâu, có điểm yếu và điểm mạnh rõ ràng. Đừng quên tạo tình huống bất ngờ để giữ chân người đọc. Và quan trọng nhất, hãy viết mỗi ngày, dù chỉ một trang.",
          likes: 255,
          views: 3100,
          comments: 38,
          shares: 12,
          accountRefId: "ACC03"
        },
        {
          blogId: 4,
          title: "5 bí quyết giúp giảng viên truyền cảm hứng cho sinh viên",
          postDate: new Date("2025-06-18"),
          content: "Chào các bạn, tôi là Long Phạm Minh – giảng viên Đại học Văn Lang. Trong lớp học, sự hứng thú của sinh viên phụ thuộc rất nhiều vào cách bạn truyền đạt kiến thức. Hãy bắt đầu bài giảng bằng một câu chuyện, khuyến khích sinh viên đặt câu hỏi, và sử dụng hình ảnh, video minh hoạ. Cuối cùng, đừng quên dành lời khen khi các em tiến bộ.",
          likes: 390,
          views: 5000,
          comments: 54,
          shares: 21,
          accountRefId: "ACC04"
        },
        {
          blogId: 5,
          title: "Xu hướng thời trang thu – đông 2025",
          postDate: new Date("2025-08-05"),
          content: "Xin chào, tôi là Lan Nguyễn Thị Thu – nhà thiết kế thời trang. Thu – đông năm nay, phong cách tối giản với tông màu đất sẽ lên ngôi. Các chất liệu như len cashmere, dạ và tweed sẽ mang lại sự ấm áp nhưng vẫn thanh lịch. Hãy kết hợp phụ kiện kim loại mảnh để tạo điểm nhấn tinh tế cho bộ trang phục.",
          likes: 500,
          views: 6200,
          comments: 72,
          shares: 30,
          accountRefId: "ACC05"
        },
        {
          blogId: 6,
          title: "Cách chụp ảnh phong cảnh ấn tượng",
          postDate: new Date("2025-07-28"),
          content: "Xin chào, tôi là Khoa Lê Minh – nhiếp ảnh gia tự do. Khi chụp phong cảnh, hãy chọn thời điểm bình minh hoặc hoàng hôn để có ánh sáng mềm mại. Sử dụng tripod để giữ máy ổn định và chọn khẩu độ nhỏ (f/8 – f/16) để mọi chi tiết đều rõ nét. Đừng quên tìm góc chụp độc đáo để bức ảnh của bạn nổi bật.",
          likes: 278,
          views: 3500,
          comments: 40,
          shares: 15,
          accountRefId: "ACC06"
        },
        {
          blogId: 7,
          title: "Phương pháp học tiếng Anh giao tiếp hiệu quả",
          postDate: new Date("2025-08-08"),
          content: "Xin chào, tôi là Trinh Hoàng Thị Bích – giáo viên tiếng Anh. Để giao tiếp tiếng Anh tốt, bạn nên luyện nghe mỗi ngày bằng cách xem phim hoặc nghe podcast. Khi học từ mới, hãy đặt chúng vào câu hoàn chỉnh để ghi nhớ lâu hơn. Quan trọng nhất, đừng ngại nói – hãy luyện tập với bạn bè hoặc tham gia câu lạc bộ tiếng Anh.",
          likes: 360,
          views: 4800,
          comments: 52,
          shares: 18,
          accountRefId: "ACC07"
        },
        {
          blogId: 8,
          title: "Bí quyết khởi nghiệp thành công từ con số 0",
          postDate: new Date("2025-07-12"),
          content: "Chào các bạn, tôi là Minh Trần Quốc – một doanh nhân. Khởi nghiệp từ con số 0 đòi hỏi bạn phải có ý tưởng độc đáo, hiểu rõ thị trường và kiên trì. Hãy bắt đầu từ quy mô nhỏ để kiểm chứng mô hình, sau đó mở rộng khi đã có khách hàng trung thành. Và đừng quên, thất bại là một phần của hành trình.",
          likes: 420,
          views: 5500,
          comments: 60,
          shares: 25,
          accountRefId: "ACC08"
        },
        {
          blogId: 9,
          title: "5 dấu hiệu cảnh báo bệnh tim mạch bạn không nên bỏ qua",
          postDate: new Date("2025-08-02"),
          content: "Xin chào, tôi là Thảo Võ Ngọc – bác sĩ tại Bệnh viện Bạch Mai. Tim mạch là căn bệnh nguy hiểm nhưng nhiều người chủ quan. Một số dấu hiệu cảnh báo bao gồm: đau tức ngực, khó thở, chóng mặt, mệt mỏi bất thường, và nhịp tim không đều. Nếu gặp các triệu chứng này, bạn nên đi khám ngay để được chẩn đoán sớm.",
          likes: 510,
          views: 7200,
          comments: 85,
          shares: 40,
          accountRefId: "ACC09"
        },
        {
          blogId: 10,
          title: "Chiến lược Marketing trên mạng xã hội năm 2025",
          postDate: new Date("2025-07-20"),
          content: "Xin chào, tôi là Hạnh Phan Thị Thu – chuyên viên Marketing. Năm 2025, video ngắn và livestream vẫn sẽ là xu hướng chủ đạo. Doanh nghiệp nên tập trung vào nội dung chân thật, tương tác trực tiếp với khách hàng và sử dụng AI để cá nhân hoá thông điệp. Hãy theo dõi số liệu để điều chỉnh chiến lược kịp thời.",
          likes: 295,
          views: 3900,
          comments: 42,
          shares: 17,
          accountRefId: "ACC10"
        },
        {
          blogId: 11,
          title: "Ngôn ngữ lập trình nào nên học đầu tiên?",
          postDate: new Date("2025-08-06"),
          content: "Xin chào, tôi là Tùng Nguyễn Văn – kỹ sư phần mềm. Nếu bạn mới bắt đầu, Python là lựa chọn tuyệt vời nhờ cú pháp đơn giản và cộng đồng hỗ trợ mạnh. Sau đó, bạn có thể học JavaScript để phát triển web hoặc Java để làm ứng dụng. Quan trọng là hãy làm dự án thực tế để áp dụng kiến thức.",
          likes: 380,
          views: 4600,
          comments: 50,
          shares: 22,
          accountRefId: "ACC11"
        },
        {
          blogId: 12,
          title: "Top 5 điểm du lịch không thể bỏ qua ở Việt Nam",
          postDate: new Date("2025-08-03"),
          content: "Xin chào, tôi là Vy Hoàng Mỹ – blogger du lịch. Nếu bạn muốn khám phá Việt Nam, đừng bỏ qua: Sa Pa, Hạ Long, Hội An, Đà Lạt và Phú Quốc. Mỗi nơi đều có vẻ đẹp riêng, từ cảnh núi hùng vĩ đến biển xanh cát trắng. Hãy chuẩn bị máy ảnh và tinh thần khám phá!",
          likes: 540,
          views: 8000,
          comments: 92,
          shares: 48,
          accountRefId: "ACC12"
        },
        {
          blogId: 13,
          title: "Lịch tập gym 5 buổi/tuần cho người mới bắt đầu",
          postDate: new Date("2025-08-09"),
          content: "Xin chào, tôi là Quân Lâm Hoàng – huấn luyện viên thể hình. Với người mới bắt đầu, hãy tập 5 buổi/tuần: 2 buổi cho phần thân trên, 2 buổi cho thân dưới và 1 buổi cardio toàn thân. Luôn khởi động trước và giãn cơ sau khi tập. Kết hợp chế độ ăn hợp lý để đạt kết quả tốt nhất.",
          likes: 410,
          views: 5700,
          comments: 58,
          shares: 26,
          accountRefId: "ACC13"
        }
      ];

      const blogsToInsert = blogsData.map(blog => {
        const account = accounts.find(a => a.accountId === blog.accountRefId);
        return {
          ...blog,
          Account: account?._id,
        };
      });

      await this.blogModel.insertMany(blogsToInsert);
      console.log("Blogs seeded!");
    }
  }
}
