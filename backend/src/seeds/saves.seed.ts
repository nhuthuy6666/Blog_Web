import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Save, SaveDocument } from 'src/modules/saves/schemas/save.schema';
import { Account, AccountDocument } from 'src/modules/accounts/schemas/account.schema';
import { Blog, BlogDocument } from 'src/modules/blogs/schemas/blog.schema';

@Injectable()
export class SaveSeedService implements OnModuleInit {
  constructor(
    @InjectModel(Save.name) private saveModel: Model<SaveDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.saveModel.countDocuments();
    if (count > 0) return;

    console.log('Seeding Saves...');

    const accounts = await this.accountModel.find().lean();
    const blogs = await this.blogModel.find().lean();

    if (accounts.length < 5 || blogs.length < 5) {
      console.warn('Không đủ dữ liệu account hoặc blog để seed Save!');
      return;
    }

    const getRandomBlogs = (num: number) => {
      const shuffled = [...blogs].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num).map(b => b._id);
    };

    const savesData = [
      {
        Account: accounts[0]._id,
        saveId: 'S001',
        listBlog: getRandomBlogs(3),
      },
      {
        Account: accounts[1]._id,
        saveId: 'S002',
        listBlog: getRandomBlogs(2),
      },
      {
        Account: accounts[2]._id,
        saveId: 'S003',
        listBlog: getRandomBlogs(4),
      },
      {
        Account: accounts[3]._id,
        saveId: 'S004',
        listBlog: getRandomBlogs(1),
      },
      {
        Account: accounts[4]._id,
        saveId: 'S005',
        listBlog: getRandomBlogs(3),
      },
    ];

    await this.saveModel.insertMany(savesData);
    console.log('Saves seeded!');
  }
}
