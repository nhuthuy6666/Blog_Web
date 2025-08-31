import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogDocument } from 'src/modules/blogs/schemas/blog.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async toggleLike(accountId: string, blogId: string): Promise<Like> {
    // Tìm account theo accountId
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }

    // Tìm blog theo blogId
    const blog = await this.blogModel.findOne({ blogId });
    if (!blog) {
      throw new NotFoundException(`Blog with blogId=${blogId} not found`);
    }

    // Tìm document Like của user
    let likeDoc = await this.likeModel.findOne({ Account: account._id });

    if (!likeDoc) {
      // nếu chưa có thì tạo mới
      likeDoc = new this.likeModel({
        Account: account._id,
        blogList: [blog._id],
      });
      return likeDoc.save();
    }

    // Kiểm tra đã like blog chưa
    const alreadyLiked = likeDoc.blogList.some(
      (b) => b.toString() === blog._id.toString(),
    );

    if (alreadyLiked) {
      // Unlike → xoá blog._id khỏi danh sách
      likeDoc.blogList = likeDoc.blogList.filter(
        (b) => b.toString() !== blog._id.toString(),
      );
    } else {
      // Like → push blog._id
      likeDoc.blogList.push(blog._id);
    }

    return likeDoc.save();
  }

  async getUserLikes(accountId: string): Promise<Like> {
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }

    let likeDoc = await this.likeModel
      .findOne({ Account: account._id })
      .populate('blogList');

    if (!likeDoc) {
      // nếu chưa có thì tạo mới
      likeDoc = new this.likeModel({
        Account: account._id,
        blogList: [],
      });
      return likeDoc.save();
    };

    return likeDoc;
  }
}
