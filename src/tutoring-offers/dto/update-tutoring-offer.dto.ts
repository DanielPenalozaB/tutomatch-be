import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTutoringOfferDto } from './create-tutoring-offer.dto';

export class UpdateTutoringOfferDto extends PartialType(CreateTutoringOfferDto) {
  @ApiProperty({
    description: 'Whether the offer is active',
    example: true,
    required: false,
  })
  isActive?: boolean;
}