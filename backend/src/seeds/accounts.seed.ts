import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/modules/accounts/schemas/account.schema";
import { Author, AuthorDocument } from "src/modules/authors/schemas/author.schema";

@Injectable()
export class AccountSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>
  ) {}

  async onModuleInit() {
    const count = await this.accountModel.countDocuments().exec();

    if (count === 0) {
      console.log("Seeding Accounts...");

      const authors = await this.authorModel.find().lean();
      const accountsData = [
        {
          accountId: "ACC01",
          avatar: "https://i.pravatar.cc/150?img=1",
          name: "Huy Nguyen",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2022-01-15"),
          email: "huy.nguyen@example.com",
          link: "https://facebook.com/huynguyen",
          followers: 1500,
          authorRefId: "A01",
        },
        {
          accountId: "ACC02",
          avatar: "https://i.pravatar.cc/150?img=2",
          name: "Ngan Truong",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2021-11-02"),
          email: "ngan.truong@example.com",
          link: "https://instagram.com/ngantruong",
          followers: 980,
          authorRefId: "A02",
        },
        {
          accountId: "ACC03",
          avatar: "https://i.pravatar.cc/150?img=3",
          name: "Mai Duong",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2023-03-10"),
          email: "mai.duong@example.com",
          link: "",
          followers: 340,
          authorRefId: "A03",
        },
        {
          accountId: "ACC04",
          avatar: "https://i.pravatar.cc/150?img=4",
          name: "Long Pham",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2020-08-21"),
          email: "long.pham@example.com",
          link: "",
          followers: 720,
          authorRefId: "A04",
        },
        {
          accountId: "ACC05",
          avatar: "https://i.pravatar.cc/150?img=5",
          name: "Lan Nguyen",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2019-07-14"),
          email: "lan.nguyen@example.com",
          link: "",
          followers: 5200,
          authorRefId: "A05",
        },
        {
          accountId: "ACC06",
          avatar: "https://i.pravatar.cc/150?img=6",
          name: "Khoa Le",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2021-09-30"),
          email: "khoa.le@example.com",
          link: "",
          followers: 1800,
          authorRefId: "A06",
        },
        {
          accountId: "ACC07",
          avatar: "https://i.pravatar.cc/150?img=7",
          name: "Trinh Hoang",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2022-06-10"),
          email: "trinh.hoang@example.com",
          link: "",
          followers: 640,
          authorRefId: "A07",
        },
        {
          accountId: "ACC08",
          avatar: "https://i.pravatar.cc/150?img=8",
          name: "Minh Tran",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2018-05-18"),
          email: "minh.tran@example.com",
          link: "",
          followers: 2300,
          authorRefId: "A08",
        },
        {
          accountId: "ACC09",
          avatar: "https://i.pravatar.cc/150?img=9",
          name: "Thao Vo",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2020-10-05"),
          email: "thao.vo@example.com",
          link: "",
          followers: 1290,
          authorRefId: "A09",
        },
        {
          accountId: "ACC10",
          avatar: "https://i.pravatar.cc/150?img=10",
          name: "Hanh Phan",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2023-01-01"),
          email: "hanh.phan@example.com",
          link: "",
          followers: 450,
          authorRefId: "A10",
        },
        {
          accountId: "ACC11",
          avatar: "https://i.pravatar.cc/150?img=11",
          name: "Tung Tung",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2024-01-01"),
          email: "tung.phan@example.com",
          link: "",
          followers: 50,
          authorRefId: "A11",
        },
        {
          accountId: "ACC12",
          avatar: "https://i.pravatar.cc/150?img=12",
          name: "My Hoang",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2023-05-01"),
          email: "hoang.phan@example.com",
          link: "",
          followers: 450,
          authorRefId: "A12",
        },
        {
          accountId: "ACC13",
          avatar: "https://i.pravatar.cc/150?img=13",
          name: "Lam Quan",
          password: "$2b$10$GIYGFvc1dPEsi.3Xt.C5QuT4flpxLrk/yNgAsgGVrYJ0/Fh6K9EAG",
          joinDate: new Date("2023-01-01"),
          email: "quan.phan@example.com",
          link: "",
          followers: 70,
          authorRefId: "A13",
        }
      ];

      const accountsToInsert = accountsData.map(acc => {
        const author = authors.find(a => a.authorId === acc.authorRefId);
        return {
          ...acc,
          Author: author?._id, 
        };
      });

      await this.accountModel.insertMany(accountsToInsert);
      console.log("Accounts seeded!");
    }
  }
}
