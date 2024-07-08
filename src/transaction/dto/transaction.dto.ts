import { DebtDto } from '@/debts/dto/debt.dto';
import { IncomeDto } from '@/incomes/dto/income.dto';

export class TransactionDto {
  readonly transaction: IncomeDto | DebtDto;
}
