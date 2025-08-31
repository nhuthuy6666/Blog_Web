import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "src/modules/comments/schemas/comment.schema";
import { Account, AccountDocument } from "src/modules/accounts/schemas/account.schema";
import { Blog, BlogDocument } from "src/modules/blogs/schemas/blog.schema";

@Injectable()
export class CommentSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>
  ) {}

  async onModuleInit() {
    const count = await this.commentModel.countDocuments().exec();

    if (count === 0) {
      console.log("Seeding Comments...");

      const blogs = await this.blogModel.find().lean();
      const accounts = await this.accountModel.find().lean();

      const commentsData = [
        {
          commentId: "cmt01",
          content: "Bài viết rất bổ ích!",
          likes: 0,
          accountRefId: "ACC01",
          blogRefId: 13
        },
        {
          commentId: "cmt02",
          content: "Cảm ơn đã chia sẻ",
          likes: 0,
          accountRefId: "ACC02",
          blogRefId: 12
        },
        {
          commentId: "cmt03",
          content: "Good",
          likes: 0,
          accountRefId: "ACC03",
          blogRefId: 11
        },
        {
          commentId: "cmt04",
          content: "Có thể chia sẻ thêm không?",
          likes: 0,
          accountRefId: "ACC04",
          blogRefId: 10
        },
        {
          commentId: "cmt05",
          content: "Tôi sẽ theo dõi bạn.",
          likes: 0,
          accountRefId: "ACC05",
          blogRefId: 9
        }
      ];

      const commentsToInsert = commentsData.map(cmt => {
        const account = accounts.find(a => a.accountId === cmt.accountRefId);
        const blog = blogs.find(b => b.blogId === cmt.blogRefId);

        return {
          ...cmt,
          Account: account?._id,
          Blog: blog?._id
        };
      });

      await this.commentModel.insertMany(commentsToInsert);
      console.log("Comments seeded!");
    }
  }
}
