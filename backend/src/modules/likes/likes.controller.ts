import { Controller, Patch, Get, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Like } from './schemas/like.schema';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // Toggle like / unlike
  @Patch('toggle/:accountId/:blogId')
  async toggleLike(
    @Param('accountId') accountId: string,
    @Param('blogId') blogId: string,
  ): Promise<Like> {
    return this.likesService.toggleLike(accountId, blogId);
  }

  // Lấy tất cả blogs user đã like
  @Get(':accountId')
  async getUserLikes(@Param('accountId') accountId: string): Promise<Like> {
    return this.likesService.getUserLikes(accountId);
  }
}
