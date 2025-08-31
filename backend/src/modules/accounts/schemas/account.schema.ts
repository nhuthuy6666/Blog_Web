
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from 'src/modules/authors/schemas/author.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema({timestamps: true})
export class Account {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Author.name, required: true})
  Author: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  accountId: string;

  @Prop()
  avatar: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  joinDate: Date;

  @Prop({required: true})
  email: string;

  @Prop()
  link: string;

  @Prop({required: true})
  followers: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
