import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from './create-conta.dto';

export class UpdateContaDto extends PartialType(CreateContaDto) {}
