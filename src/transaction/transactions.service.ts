import { Injectable } from '@nestjs/common';

import { DebtDto } from '@/debts/dto/debt.dto';
import { IncomeDto } from '@/incomes/dto/income.dto';
import { DebtsService } from '@/debts/debts.service';
import { IncomesService } from '@/incomes/incomes.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly debtsService: DebtsService,
    private readonly incomesService: IncomesService,
  ) {}

  async getTransactions(userId: string): Promise<(DebtDto | IncomeDto)[]> {
    const debts = await this.debtsService.getAllDebts(userId);
    const incomes = await this.incomesService.getAllIncomes(userId);

    const transactions = [...debts, ...incomes].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return transactions;
  }
}
