
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';
import { Blog } from 'src/modules/blogs/schemas/blog.schema';

export type SaveDocument = HydratedDocument<Save>;

@Schema({timestamps: true})
export class Save {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true})
  Account: mongoose.Types.ObjectId;

  @Prop({required: true})
  saveId: string;

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: Blog.name }], default: []})
  listBlog: mongoose.Types.ObjectId[];
}

export const SaveSchema = SchemaFactory.createForClass(Save);
