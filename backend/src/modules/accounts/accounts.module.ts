import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/modules/accounts/schemas/account.schema';
import { AccountSeedService } from 'src/seeds/accounts.seed';
import { Author, AuthorSchema } from 'src/modules/authors/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Author.name, schema: AuthorSchema }
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountSeedService],
  exports: [AccountsService],
})
export class AccountsModule {}
