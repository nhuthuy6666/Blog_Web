import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Achievement, AchievementDocument } from './schemas/achievement.schema';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Account } from 'src/modules/accounts/schemas/account.schema';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name) private achievementModel: Model<AchievementDocument>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async create(id: string, createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    const account = await this.accountModel.findOne({accountId :id}).exec();
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    const allAchies = await this.achievementModel.find({}, { achievementId: 1 }).exec();
    const numbers = allAchies.map(achie => parseInt(achie.achievementId.replace('ACM', '')) || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 39;
    const nextNumber = maxNumber + 1;
    const newAchieId = `ACM${nextNumber.toString().padStart(2, '0')}`;

    const createdAchievement = new this.achievementModel({
      ...createAchievementDto,
      Account: account._id,
      achievementId: newAchieId
    });

    return createdAchievement.save();
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementModel.find().populate('Account').lean().exec();
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementModel
      .findById(id)
      .populate('Account')
      .exec();
    if (!achievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return achievement;
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto): Promise<Achievement> {
    const updatedAchievement = await this.achievementModel
      .findByIdAndUpdate(id, updateAchievementDto, { new: true })
      .populate('Account')
      .exec();
    if (!updatedAchievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return updatedAchievement;
  }

  async remove(id: string): Promise<Achievement> {
    const deletedAchievement = await this.achievementModel.findOneAndDelete({achievementId: id}).exec();
    if (!deletedAchievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return deletedAchievement;
  }
}
