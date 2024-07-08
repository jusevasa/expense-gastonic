import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty({ description: 'Description of the income' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Amount of the income' })
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ description: 'Date of the income creation' })
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ description: 'Paid status of the income' })
  @IsBoolean()
  @IsOptional()
  readonly paid: boolean;
}
