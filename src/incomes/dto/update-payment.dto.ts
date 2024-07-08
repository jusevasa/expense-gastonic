import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIncomeDto {
  @ApiPropertyOptional({ description: 'Description of the income' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ description: 'Amount of the income' })
  @IsNumber()
  @IsOptional()
  readonly amount?: number;

  @ApiPropertyOptional({ description: 'Date of the income creation' })
  @IsDate()
  @IsOptional()
  readonly createAt?: Date;

  @ApiPropertyOptional({ description: 'Date of the income creation' })
  @IsDate()
  @IsOptional()
  readonly updateAt?: Date;

  @ApiProperty({ description: 'Paid status of the income' })
  @IsBoolean()
  @IsOptional()
  readonly paid?: boolean;
}
