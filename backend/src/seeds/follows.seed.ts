import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Follow, FollowDocument } from 'src/modules/follows/schemas/follow.schema';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';

@Injectable()
export class FollowSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.followModel.countDocuments();
    if (count > 0) return;

    console.log('Seeding Follows...');

    const accounts = await this.accountModel.find().lean();

    if (accounts.length < 5) {
      console.warn('Không đủ account để seed follow!');
      return;
    }

    const followsData = [
      {
        Account: accounts[0]._id,
        followId: 'F001',
        listAccount: [accounts[1]._id, accounts[2]._id, accounts[3]._id],
      },
      {
        Account: accounts[1]._id,
        followId: 'F002',
        listAccount: [accounts[0]._id, accounts[4]._id],
      },
      {
        Account: accounts[2]._id,
        followId: 'F003',
        listAccount: [accounts[0]._id, accounts[1]._id, accounts[4]._id],
      },
      {
        Account: accounts[3]._id,
        followId: 'F004',
        listAccount: [accounts[2]._id, accounts[1]._id],
      },
      {
        Account: accounts[4]._id,
        followId: 'F005',
        listAccount: [accounts[0]._id, accounts[2]._id, accounts[3]._id],
      },
    ];

    await this.followModel.insertMany(followsData);
    console.log('Follows seeded!');
  }
}
