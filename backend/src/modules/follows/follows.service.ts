import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from './schemas/follow.schema';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async toggleFollow(accountId: string, id: string): Promise<Follow> {
    // Tìm account theo accountId
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }
  
    const acclist = await this.accountModel.findOne({ accountId: id });
    if (!acclist) {
      throw new NotFoundException(`Account with accountId=${id} not found`);
    }
  
    // Tìm document Follow của user
    let followDoc = await this.followModel.findOne({ Account: account._id });
  
    if (!followDoc) {
      // nếu chưa có thì tạo mới
      const allFollows = await this.followModel.find({}, { followId: 1 }).exec();
      const numbers = allFollows.map(follow => parseInt(follow.followId.replace('F', '')) || 0);
      const maxNumber = numbers.length ? Math.max(...numbers) : 5;
      const nextNumber = maxNumber + 1;
      const newFollowId = `F${nextNumber.toString().padStart(3, '0')}`;

      followDoc = new this.followModel({
        Account: account._id,
        followId: newFollowId,
        listAccount: [acclist._id]
      });
      return followDoc.save();
    }
  
    const alreadyFollowd = followDoc.listAccount.some(
      (a) => a.toString() === acclist._id.toString(),
    );
  
    if (alreadyFollowd) {
      followDoc.listAccount = followDoc.listAccount.filter(
        (a) => a.toString() !== acclist._id.toString(),
      );
    } else {
      // Like → push blog._id
      followDoc.listAccount.push(acclist._id);
    }
  
    return followDoc.save();
  }
  
  async getUserFollows(accountId: string): Promise<Follow> {
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }
  
    let followDoc = await this.followModel
      .findOne({ Account: account._id })
      .populate({
        path: 'listAccount',
        populate: {
          path: 'Author', 
        },
      });
  
    if (!followDoc) {
      // nếu chưa có thì tạo mới
      const allFollows = await this.followModel.find({}, { followId: 1 }).exec();
      const numbers = allFollows.map(follow => parseInt(follow.followId.replace('F', '')) || 0);
      const maxNumber = numbers.length ? Math.max(...numbers) : 5;
      const nextNumber = maxNumber + 1;
      const newFollowId = `F${nextNumber.toString().padStart(3, '0')}`;

      followDoc = new this.followModel({
        Account: account._id,
        followId: newFollowId,
        listAccount: []
      });
      return followDoc.save();
    };
  
    return followDoc;
  }

  async findAll(): Promise<Follow[]> {
    return this.followModel
      .find()
      .populate('Account')
      .populate({
        path: 'listAccount',
        populate: {
          path: 'Author', 
        },
      })
      .exec();
  }

  async update(followId: string, updateFollowDto: UpdateFollowDto): Promise<Follow> {
    const updatedFollow = await this.followModel
      .findOneAndUpdate({ followId }, updateFollowDto,{ new: true })
      .populate('Account')
      .populate('listAccount')
      .exec();

    if (!updatedFollow) {
      throw new NotFoundException(`Follow with followId=${followId} not found`);
    }

    return updatedFollow;
  }

  async remove(id: string): Promise<Follow> {
    const deletedFollow = await this.followModel.findByIdAndDelete(id).exec();
    if (!deletedFollow) {
      throw new NotFoundException(`Follow with ID ${id} not found`);
    }
    return deletedFollow;
  }
}
