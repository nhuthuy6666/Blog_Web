import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schemas/account.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    // Kiểm tra email đã tồn tại
    const existing = await this.accountModel.findOne({ email: createAccountDto.email });
    if (existing) {
      throw new Error("Email đã tồn tại");
    }

    // Lấy tất cả accountId
    const allAccounts = await this.accountModel.find({}, { accountId: 1 }).exec();
    const numbers = allAccounts.map(acc => parseInt(acc.accountId.replace('ACC', '')) || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 13; // bắt đầu từ 14
    const nextNumber = maxNumber + 1;
    const newAccountId = `ACC${nextNumber.toString().padStart(2, '0')}`;

    const hashedPassword = await bcrypt.hash(createAccountDto.password, 10);
    const createdAccount = new this.accountModel({
      ...createAccountDto,
      password: hashedPassword,
      accountId: newAccountId,
      avatar: null,               
      joinDate: new Date(),        
      followers: 0 
    });

    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().populate('Author').lean().exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel
      .findOne({ accountId: id })
      .populate('Author')
      .exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(accountId: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const updatedAccount = await this.accountModel
      .findOneAndUpdate({ accountId }, updateAccountDto, { new: true })
      .populate('Author')
      .exec();
    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    return updatedAccount;
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<Account> {
    const account = await this.accountModel.findOne({accountId: id}).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, account.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // if (oldPassword !== account.password) {
    //   throw new UnauthorizedException('Old password is incorrect');
    // }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    account.password = hashedPassword;
    // account.password = newPassword;
    await account.save();

    return account;
  }

  async remove(id: string): Promise<Account> {
    const deletedAccount = await this.accountModel.findByIdAndDelete(id).exec();
    if (!deletedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return deletedAccount;
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountModel
      .findOne({ email: email.toLowerCase().trim() })
      .populate('Author')
      .exec();
    if (!account) {
      throw new NotFoundException(`Account with Email ${email} not found`);
    }
    return account;
  }
}
