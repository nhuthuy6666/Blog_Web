
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Account } from 'src/modules/accounts/schemas/account.schema';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({timestamps: true})
export class Author {
  @Prop({required: true})
  authorId: string;

  @Prop({required: true})
  firstname: string;

  @Prop({required: true})
  lastname: string;

  @Prop({required: true})
  birthday: Date;

  @Prop({required: true})
  business: string;

  @Prop({required: true})
  address: string;

  @Prop({required: true})
  describe: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
