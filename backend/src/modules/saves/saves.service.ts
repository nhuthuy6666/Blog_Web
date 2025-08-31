import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Save, SaveDocument } from './schemas/save.schema';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogDocument } from 'src/modules/blogs/schemas/blog.schema';

@Injectable()
export class SavesService {
  constructor(
    @InjectModel(Save.name) private saveModel: Model<SaveDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async toggleSave(accountId: string, blogId: string): Promise<Save> {
    // Tìm account theo accountId
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }
  
    // Tìm blog theo blogId
    const blog = await this.blogModel.findOne({ blogId });
    if (!blog) {
      throw new NotFoundException(`Blog with blogId=${blogId} not found`);
    }
  
    // Tìm document Save của user
    let saveDoc = await this.saveModel.findOne({ Account: account._id });
  
    if (!saveDoc) {
      // nếu chưa có thì tạo mới
      const allSaves = await this.saveModel.find({}, { saveId: 1 }).exec();
      const numbers = allSaves.map(save => parseInt(save.saveId.replace('S', '')) || 0);
      const maxNumber = numbers.length ? Math.max(...numbers) : 5;
      const nextNumber = maxNumber + 1;
      const newSaveId = `S${nextNumber.toString().padStart(3, '0')}`;

      saveDoc = new this.saveModel({
        Account: account._id,
        saveId: newSaveId,
        listBlog: [blog._id],
      });
      return saveDoc.save();
    }
  
    // Kiểm tra đã save blog chưa
    const alreadyLiked = saveDoc.listBlog.some(
      (b) => b.toString() === blog._id.toString(),
    );
  
    if (alreadyLiked) {
      // Unsave→ xoá blog._id khỏi danh sách
      saveDoc.listBlog = saveDoc.listBlog.filter(
        (b) => b.toString() !== blog._id.toString(),
      );
    } else {
      // Like → push blog._id
      saveDoc.listBlog.push(blog._id);
    }
    return saveDoc.save();
  }

  async create(createSaveDto: CreateSaveDto): Promise<Save> {
    const createdSave = new this.saveModel(createSaveDto);
    return createdSave.save();
  }

  async findAll(): Promise<Save[]> {
    return this.saveModel
      .find()
      .populate('Account')
      .populate('listBlog')
      .lean()
      .exec();
  }

  async getUserSaves(accountId: string): Promise<Save> {
    const account = await this.accountModel.findOne({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with accountId=${accountId} not found`);
    }
  
    let saveDoc = await this.saveModel
      .findOne({ Account: account._id })
      .populate('listBlog');
  
    if (!saveDoc) {
      // nếu chưa có thì tạo mới
      const allSaves = await this.saveModel.find({}, { saveId: 1 }).exec();
      const numbers = allSaves.map(save => parseInt(save.saveId.replace('S', '')) || 0);
      const maxNumber = numbers.length ? Math.max(...numbers) : 5;
      const nextNumber = maxNumber + 1;
      const newSaveId = `S${nextNumber.toString().padStart(3, '0')}`;

      saveDoc = new this.saveModel({
        Account: account._id,
        saveId: newSaveId,
        listBlog: [],
      });
      return saveDoc.save();
    }
    
    return saveDoc;
  }

  async update(id: string, updateSaveDto: UpdateSaveDto): Promise<Save> {
    const updatedSave = await this.saveModel
      .findByIdAndUpdate(id, updateSaveDto, { new: true })
      .populate('Account')
      .populate('listBlog')
      .exec();
    if (!updatedSave) {
      throw new NotFoundException(`Save with ID ${id} not found`);
    }
    return updatedSave;
  }

  async remove(id: string): Promise<Save> {
    const deletedSave = await this.saveModel.findByIdAndDelete(id).exec();
    if (!deletedSave) {
      throw new NotFoundException(`Save with ID ${id} not found`);
    }
    return deletedSave;
  }
}
