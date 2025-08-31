
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({timestamps: true})
export class Blog {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true})
  Account: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  blogId: number;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  postDate: Date;

  @Prop({required: true})
  content: string;

  @Prop({required: true})
  likes: number;

  @Prop({required: true})
  views: number;

  @Prop({required: true})
  comments: number;

  @Prop({required: true})
  shares: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
