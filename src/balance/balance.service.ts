import { Injectable } from '@nestjs/common';

import { DebtsService } from 'src/debts/debts.service';
import { IncomesService } from 'src/incomes/incomes.service';
import { BalanceDto } from './dto/balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    private readonly debtsService: DebtsService,
    private readonly incomesService: IncomesService,
  ) {}

  async getBalance(userId: string): Promise<BalanceDto> {
    const totalDebts =
      await this.debtsService.getTotalDebtAmountForUser(userId);
    const totalIncomes =
      await this.incomesService.getTotalIncomeAmountForUser(userId);

    const balance = totalIncomes - totalDebts;

    return {
      userId,
      totalDebts,
      totalIncomes,
      balance,
    };
  }
}
