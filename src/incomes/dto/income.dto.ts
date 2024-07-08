import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class IncomeDto {
  @IsDate()
  readonly date: Date;

  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly userId?: string;

  @IsBoolean()
  readonly paid: boolean;

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date;
}
