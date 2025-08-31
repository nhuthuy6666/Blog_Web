
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';

export type AchievementDocument = HydratedDocument<Achievement>;

@Schema({timestamps: true})
export class Achievement {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Account.name, required: true})
  Account: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  achievementId: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  type: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
