import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from 'src/modules/likes/dto/create-skill.dto';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {}
