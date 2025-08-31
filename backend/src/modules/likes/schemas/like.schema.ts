
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';
import { Blog } from 'src/modules/blogs/schemas/blog.schema';

export type LikeDocument = HydratedDocument<Like>;

@Schema({timestamps: true})
export class Like {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true})
  Account: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Blog.name }], default: [] })
  blogList: mongoose.Types.ObjectId[];
}

export const LikeSchema = SchemaFactory.createForClass(Like);
