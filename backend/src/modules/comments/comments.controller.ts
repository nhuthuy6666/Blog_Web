import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':accountId/:blogId')
  createRoot(
    @Param('accountId') accountId: string,
    @Param('blogId') blogId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(accountId, null, blogId, createCommentDto);
  }

  // Reply comment (có parent)
  @Post(':accountId/:blogId/:parentId')
  createReply(
    @Param('accountId') accountId: string,
    @Param('blogId') blogId: number,
    @Param('parentId') parentId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(accountId, parentId, blogId, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
