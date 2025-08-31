import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow } from 'src/modules/follows/schemas/follow.schema';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Patch('toggle/:accountId/:id')
  async toggleFollow(
    @Param('accountId') accountId: string,
    @Param('id') id: string,
    ): Promise<Follow> {
    return this.followsService.toggleFollow(accountId, id);
  }

  @Get(':accountId')
  async getUserFollows(@Param('accountId') accountId: string): Promise<Follow> {
    return this.followsService.getUserFollows(accountId);
  }

  @Get()
  async findAll(): Promise<Follow[]> {
    return this.followsService.findAll();
  }


  @Patch(':followId')
  update(@Param('followId') followId: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followsService.update(followId, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followsService.remove(id);
  }
}
