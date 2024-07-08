import {
  IsString,
  IsNumber,
  IsDate,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class DebtDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly userId?: string;

  @IsNumber()
  readonly amount: number;

  @IsDate()
  readonly date: Date;

  @IsUUID()
  readonly incomeId: string;

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date;
}
