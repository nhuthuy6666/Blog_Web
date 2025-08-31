import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentSeedService } from 'src/seeds/comments.seed';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogSchema } from 'src/modules/blogs/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Blog.name, schema: BlogSchema }
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentSeedService],
})
export class CommentsModule {}
