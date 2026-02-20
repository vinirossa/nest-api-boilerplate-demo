import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneProductDto {
  @ApiProperty({
    description: 'Product ID',
    example: '123',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
