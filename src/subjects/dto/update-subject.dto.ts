import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @ApiProperty({
    description: 'Whether to toggle the active status',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  toggleActive?: boolean;
}