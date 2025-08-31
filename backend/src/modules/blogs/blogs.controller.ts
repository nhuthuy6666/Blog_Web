import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(id, createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogsService.findOne(id);
  }

  @Get('account/:accountId')
  async getBlogsByAccount(@Param('accountId') accountId: string) {
    return this.blogsService.findByAccountId(accountId);
  }

  @Patch(':blogId')
  update(@Param('blogId') blogId: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(blogId, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
