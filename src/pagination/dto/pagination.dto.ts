import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Order } from '../enum/order.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'User ID to filter debts',
    example: 'user123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Number of items to return',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({
    description: 'Page number to retrieve',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({
    description: 'Order to sort the results',
    example: Order.DESC,
    enum: Order,
    required: false,
    default: Order.DESC,
  })
  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.DESC;

  @ApiProperty({
    description: 'Filters to apply to the query',
    example: { field1: 'value1', field2: 'value2' },
    required: false,
  })
  @IsOptional()
  filters?: { [key: string]: any } = {};
}
