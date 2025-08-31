import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Author, AuthorDocument } from 'src/modules/authors/schemas/author.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(id: string, createSkillDto: CreateSkillDto): Promise<Skill> {
    const author = await this.authorModel.findOne({authorId :id}).exec();
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    const allAchies = await this.skillModel.find({}, { skillId: 1 }).exec();
    const numbers = allAchies.map(achie => parseInt(achie.skillId.replace('S', '')) || 0);
    const maxNumber = numbers.length ? Math.max(...numbers) : 39;
    const nextNumber = maxNumber + 1;
    const newSkillId = `S${nextNumber.toString().padStart(2, '0')}`;

    const createdSkill = new this.skillModel({
      ...createSkillDto,
      Author: author._id,
      skillId: newSkillId,
    });

    return createdSkill.save();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillModel
      .find()
      .populate('Author')
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillModel
      .findById(id)
      .populate('Author')
      .exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const updatedSkill = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .populate('Author')
      .exec();
    if (!updatedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return updatedSkill;
  }

  async remove(id: string): Promise<Skill> {
    const deletedSkill = await this.skillModel.findOneAndDelete({skillId: id}).exec();
    if (!deletedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return deletedSkill;
  }
}
