import { Module } from '@nestjs/common';
import { SavesService } from './saves.service';
import { SavesController } from './saves.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Save, SaveSchema } from './schemas/save.schema';
import { SaveSeedService } from 'src/seeds/saves.seed';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogSchema } from 'src/modules/blogs/schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Save.name, schema: SaveSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Blog.name, schema: BlogSchema}
    ]),
  ],
  controllers: [SavesController],
  providers: [SavesService, SaveSeedService],
})
export class SavesModule {}
