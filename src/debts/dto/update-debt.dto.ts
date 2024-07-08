import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsUUID,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDebtDto {
  @ApiPropertyOptional({ description: 'Description of the debt' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ description: 'Amount of the debt' })
  @IsNumber()
  @IsOptional()
  readonly amount?: number;

  @ApiPropertyOptional({ description: 'Date of the debt creation' })
  @IsDate()
  @IsOptional()
  readonly date?: Date;

  @ApiPropertyOptional({ description: 'ID of the associated income' })
  @IsUUID()
  @IsOptional()
  readonly incomeId?: string;
}
