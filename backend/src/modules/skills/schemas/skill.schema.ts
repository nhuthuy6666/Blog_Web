
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from 'src/modules/authors/schemas/author.schema';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({timestamps: true})
export class Skill {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Author.name, required: true})
  Author: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  skillId: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  percent: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
