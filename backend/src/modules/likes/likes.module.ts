import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like, LikeSchema } from './schemas/like.schema';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogSchema } from 'src/modules/blogs/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
