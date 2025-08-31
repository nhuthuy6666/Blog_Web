import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schemas/follow.schema';
import { FollowSeedService } from 'src/seeds/follows.seed';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follow.name, schema: FollowSchema },
      { name: Account.name, schema: AccountSchema }
    ]),
  ],
  controllers: [FollowsController],
  providers: [FollowsService, FollowSeedService],
})
export class FollowsModule {}
