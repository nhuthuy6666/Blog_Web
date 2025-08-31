
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';
import { Blog } from 'src/modules/blogs/schemas/blog.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({timestamps: true})
export class Comment {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true})
  Account: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Blog.name, required: true})
  Blog: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  commentId: string;

  @Prop({required: true})
  content: string;

  @Prop({required: true})
  likes: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name, default: null })
  parent: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }], default: [] })
  children: mongoose.Schema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
