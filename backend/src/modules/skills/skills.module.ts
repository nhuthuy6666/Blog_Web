import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { SkillSeedService } from 'src/seeds/skills.seed';
import { Author, AuthorSchema } from 'src/modules/authors/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: SkillSchema },
      { name: Author.name, schema: AuthorSchema}
    ]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService, SkillSeedService],
})
export class SkillsModule {}
