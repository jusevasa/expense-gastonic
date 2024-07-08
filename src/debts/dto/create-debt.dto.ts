import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtDto {
  @ApiProperty({ description: 'Description of the debt' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Amount of the debt' })
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ description: 'Date of the debt creation' })
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ description: 'ID of the associated income' })
  @IsUUID()
  @IsNotEmpty()
  readonly incomeId: string;
}
