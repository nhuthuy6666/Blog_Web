import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';
import { Comment, CommentDocument } from 'src/modules/comments/schemas/comment.schema';
import { Like, LikeDocument } from 'src/modules/likes/schemas/like.schema';
import { Save, SaveDocument } from 'src/modules/saves/schemas/save.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    @InjectModel(Save.name) private saveModel: Model<SaveDocument>,
  ) {}

  async create(id: string, createBlogDto: CreateBlogDto): Promise<Blog> {
    const account = await this.accountModel.findOne({accountId: id}).exec();
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    const allBlogs = await this.blogModel.find({}, { blogId: 1 }).exec();
    const numbers = allBlogs.map(blog => blog.blogId || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const nextNumber = maxNumber + 1;

    const createdBlog = new this.blogModel({
      ...createBlogDto,
      blogId: nextNumber,
      Account: account._id,
      postDate: new Date(),   
      likes: 0,               
      views: 0,               
      comments: 0,            
      shares: 0, 
    });
    return createdBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().populate('Account').lean().exec();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogModel
      .findOne({ blogId: id }) 
      .populate({
        path: 'Account',
        populate: { path: 'Author' }  
      })
      .exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }


  async findByAccountId(accountId: string): Promise<Blog[]> {
    // Tìm account theo accountId
    const account = await this.accountModel.findOne({ accountId }).exec();
    if (!account) {
      throw new NotFoundException(`Account with id=${accountId} not found`);
    }

    // Lấy blog dựa vào ObjectId của account
    const blogs = await this.blogModel
      .find({ Account: account._id })   // Account là ref tới Account schema
      .populate({
        path: 'Account',
        populate: { path: 'Author' }   // populate thông tin tác giả
      })
      .exec();
      
    return blogs;
  }

  async update(blogId: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findOneAndUpdate({ blogId }, updateBlogDto, { new: true }) 
      .populate('Account')
      .exec();
      
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${blogId} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findOneAndDelete({blogId: id}).exec();
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    await this.commentModel.deleteMany({ Blog: deletedBlog._id }).exec();

    await this.likeModel.updateMany(
      { blogList: deletedBlog._id },
      { $pull: { blogList: deletedBlog._id } }
    ).exec();

    await this.saveModel.updateMany(
      { listBlog: deletedBlog._id },
      { $pull: { listBlog: deletedBlog._id } }
    ).exec();

    return deletedBlog;
  }
}
