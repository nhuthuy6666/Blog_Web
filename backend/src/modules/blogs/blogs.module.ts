import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { BlogSeedService } from 'src/seeds/blogs.seed';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';
import { Comment, CommentSchema } from 'src/modules/comments/schemas/comment.schema';
import { Like, LikeSchema } from 'src/modules/likes/schemas/like.schema';
import { Save, SaveSchema } from 'src/modules/saves/schemas/save.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Like.name, schema: LikeSchema },
      { name: Save.name, schema: SaveSchema }
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogSeedService],
})
export class BlogsModule {}
