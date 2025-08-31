import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavesService } from './saves.service';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { Save } from 'src/modules/saves/schemas/save.schema';

@Controller('saves')
export class SavesController {
  constructor(private readonly savesService: SavesService) {}

  @Patch('toggle/:accountId/:blogId')
  async toggleSave(
    @Param('accountId') accountId: string,
    @Param('blogId') blogId: string,
    ): Promise<Save> {
    return this.savesService.toggleSave(accountId, blogId);
  }

  @Post()
  create(@Body() createSaveDto: CreateSaveDto) {
    return this.savesService.create(createSaveDto);
  }

  @Get()
  findAll() {
    return this.savesService.findAll();
  }

  @Get(':accountId')
  async getUserSaves(@Param('accountId') accountId: string): Promise<Save> {
    return this.savesService.getUserSaves(accountId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaveDto: UpdateSaveDto) {
    return this.savesService.update(id, updateSaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savesService.remove(id);
  }
}
