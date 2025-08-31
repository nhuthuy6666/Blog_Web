import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Author, AuthorDocument } from "src/modules/authors/schemas/author.schema";

@Injectable()
export class AuthorSeedService implements OnModuleInit {
    constructor(
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    ) {}

    async onModuleInit() {
        const count = await this.authorModel.countDocuments().exec();

        if (count === 0) {
            console.log("Seeding Authors...");

            await this.authorModel.insertMany([
                {
                    authorId: "A01",
                    firstname: "Huy",
                    lastname: "Nguyễn Huỳnh Thanh",
                    birthday: new Date("1990-05-12"),
                    business: "Đầu bếp chính tại CMMB",
                    address: "120 Hai Bà Trưng, Hà Nội",
                    describe: "Chia sẻ kinh nghiệm và các công thức nấu ăn ngon cho gia đình."
                },
                {
                    authorId: "A02",
                    firstname: "Ngân",
                    lastname: "Trương Thanh",
                    birthday: new Date("1989-07-19"),
                    business: "Nhà báo tại toàn soạn BBM",
                    address: "122 Đống Đa, Sài Gòn",
                    describe: "Nỗ lực để đạt đến thành công!"
                },
                {
                    authorId: "A03",
                    firstname: "Mai",
                    lastname: "Dương Thị",
                    birthday: new Date("1997-12-01"),
                    business: "Nhà văn",
                    address: "79 Nha Trang, Khánh Hòa",
                    describe: "Life is beautiful."
                },
                {
                    authorId: "A04",
                    firstname: "Long",
                    lastname: "Phạm Minh",
                    birthday: new Date("1985-03-08"),
                    business: "Giảng viên Đại học Văn Lang",
                    address: "45 Nguyễn Thái Sơn, Gò Vấp, TP.HCM",
                    describe: "Yêu nghề, truyền cảm hứng cho sinh viên."
                },
                {
                    authorId: "A05",
                    firstname: "Lan",
                    lastname: "Nguyễn Thị Thu",
                    birthday: new Date("1992-11-23"),
                    business: "Nhà thiết kế thời trang",
                    address: "12 Lê Lợi, Huế",
                    describe: "Sáng tạo là không giới hạn."
                },
                {
                    authorId: "A06",
                    firstname: "Khoa",
                    lastname: "Lê Minh",
                    birthday: new Date("1988-04-15"),
                    business: "Nhiếp ảnh gia tự do",
                    address: "33 Trần Phú, Đà Lạt",
                    describe: "Ghi lại những khoảnh khắc đáng nhớ."
                },
                {
                    authorId: "A07",
                    firstname: "Trinh",
                    lastname: "Hoàng Thị Bích",
                    birthday: new Date("1995-09-10"),
                    business: "Giáo viên tiếng Anh",
                    address: "88 Nguyễn Huệ, Hà Nội",
                    describe: "Dạy học với cả trái tim."
                },
                {
                    authorId: "A08",
                    firstname: "Minh",
                    lastname: "Trần Quốc",
                    birthday: new Date("1983-06-05"),
                    business: "Doanh nhân",
                    address: "60 Hai Bà Trưng, TP.HCM",
                    describe: "Luôn tìm kiếm cơ hội mới."
                },
                {
                    authorId: "A09",
                    firstname: "Thảo",
                    lastname: "Võ Ngọc",
                    birthday: new Date("1990-01-18"),
                    business: "Bác sĩ tại Bệnh viện Bạch Mai",
                    address: "78 Giải Phóng, Hà Nội",
                    describe: "Tận tâm với nghề y."
                },
                {
                    authorId: "A10",
                    firstname: "Hạnh",
                    lastname: "Phan Thị Thu",
                    birthday: new Date("1996-02-27"),
                    business: "Chuyên viên Marketing",
                    address: "15 Trần Hưng Đạo, Đà Nẵng",
                    describe: "Luôn đổi mới để thành công."
                },
                {
                    authorId: "A11",
                    firstname: "Tùng",
                    lastname: "Nguyễn Văn",
                    birthday: new Date("1984-08-21"),
                    business: "Kỹ sư phần mềm",
                    address: "9 Phạm Văn Đồng, Hà Nội",
                    describe: "Công nghệ là đam mê."
                },
                {
                    authorId: "A12",
                    firstname: "Vy",
                    lastname: "Hoàng Mỹ",
                    birthday: new Date("1998-07-14"),
                    business: "Blogger du lịch",
                    address: "22 Lý Tự Trọng, TP.HCM",
                    describe: "Khám phá thế giới qua từng chuyến đi."
                },
                {
                    authorId: "A13",
                    firstname: "Quân",
                    lastname: "Lâm Hoàng",
                    birthday: new Date("1991-10-09"),
                    business: "Huấn luyện viên thể hình",
                    address: "101 Nguyễn Văn Cừ, Cần Thơ",
                    describe: "Giúp bạn đạt được sức khỏe và hình thể mong muốn."
                }
            ]);

            console.log("Authors seeded!");
        }
    }
}
