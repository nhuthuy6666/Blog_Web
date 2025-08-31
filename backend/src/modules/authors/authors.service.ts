import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
  // Lấy tất cả authorId hiện có
    const allAuthors = await this.authorModel.find({}, { authorId: 1 }).exec();
    const numbers = allAuthors.map(author => parseInt(author.authorId.replace('A', '')) || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0; // bắt đầu từ 1
    const nextNumber = maxNumber + 1;
    const newAuthorId = `A${nextNumber.toString().padStart(2, '0')}`;

    const createdAuthor = new this.authorModel({
      ...createAuthorDto,
      authorId: newAuthorId,
    });

    return createdAuthor.save();
  }


  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(authorId: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = await this.authorModel
      .findOneAndUpdate({authorId}, updateAuthorDto, { new: true })
      .exec();
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
    return updatedAuthor;
  }

  async remove(id: string): Promise<Author> {
    const deletedAuthor = await this.authorModel.findByIdAndDelete(id).exec();
    if (!deletedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return deletedAuthor;
  }
}
