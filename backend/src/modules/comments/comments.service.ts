import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogDocument } from 'src/modules/blogs/schemas/blog.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async create( accountId: string, parentId: string | null, blogId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    
    // Tìm account từ accountId
    const account = await this.accountModel.findOne({ accountId }).exec();
    if (!account) {
      throw new NotFoundException(`Account with accountId ${accountId} not found`);
    }

    // Tìm blog
    const blog = await this.blogModel.findOne({ blogId }).exec();
    if (!blog) {
      throw new NotFoundException(`Account with accountId ${blogId} not found`);
    }

    //Tìm parent
    let parent: HydratedDocument<Comment> | null = null;
    if (parentId) {
      parent = await this.commentModel.findOne({ commentId: parentId }).exec();
      if (!parent) {
        throw new NotFoundException(`Parent comment with id ${parentId} not found`);
      }
    }

    const allcoms = await this.commentModel.find({}, { commentId: 1 }).exec();
    const numbers = allcoms.map(com => parseInt(com.commentId.replace('cmt', '')) || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 5;
    const nextNumber = maxNumber + 1;
    const newComId = `cmt${nextNumber.toString().padStart(2, '0')}`;

    // Tạo comment mới
    const newComment = new this.commentModel({
      ...createCommentDto,
      Account: account._id,
      Blog: blog._id,
      commentId: newComId,
      parent: parent ? parent._id : null,
    });

    const savedComment = await newComment.save();

    // Nếu có parentId thì update children
    if (parent) {
      await this.commentModel.findByIdAndUpdate(parent._id, {
        $push: { children: savedComment._id },
      });
    }

    const populatedComment = await savedComment.populate([
      { path: "Account", select: "accountId name" },
      { path: "Blog", select: "blogId" },
      { path: "children", populate: { path: "Account", select: "accountId name" } },
    ]);

    return populatedComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel
      .find()
      .populate([
        { path: "Account", select: "accountId name" },
        { path: "Blog", select: "blogId" },
        { 
          path: "children", 
          populate: { path: "Account", select: "accountId name" } 
        }
      ])
      .exec();
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentModel
      .findById(id)
      .populate('Account')
      .populate('Blog')
      .populate('parent')
      .populate('children')
      .exec();
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .populate('Account')
      .populate('Blog')
      .populate('parent')
      .populate('children')
      .exec();
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  async remove(commentId: string): Promise<Comment> {
    const comment = await this.commentModel.findOne({ commentId }).exec();
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    if (comment.parent) {
      await this.commentModel.findByIdAndUpdate(comment.parent, {
        $pull: { children: comment._id },
      });
      await this.commentModel.deleteOne({ _id: comment._id }).exec();
    } else {
      if (comment.children && comment.children.length > 0) {
        await this.commentModel.deleteMany({ _id: { $in: comment.children } }).exec();
      }

      await this.commentModel.deleteOne({ _id: comment._id }).exec();
    }

    return comment;
  }
}
