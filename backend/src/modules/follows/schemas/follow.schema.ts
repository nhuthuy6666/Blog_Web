
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';

export type FollowDocument = HydratedDocument<Follow>;

@Schema({timestamps: true})
export class Follow {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true })
  Account: mongoose.Types.ObjectId;

  @Prop({ required: true })
  followId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Account.name }], default: [] })
  listAccount: mongoose.Types.ObjectId[];
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
