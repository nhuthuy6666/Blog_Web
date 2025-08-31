import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Achievement, AchievementSchema } from './schemas/achievement.schema';
import { AchievementSeedService } from 'src/seeds/achievements.seed';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
      { name: Account.name, schema: AccountSchema }
    ]),
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService, AchievementSeedService],
})
export class AchievementsModule {}
