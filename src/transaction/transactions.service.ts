import { Injectable } from '@nestjs/common';

import { DebtDto } from '@/debts/dto/debt.dto';
import { IncomeDto } from '@/incomes/dto/income.dto';
import { DebtsService } from '@/debts/debts.service';
import { IncomesService } from '@/incomes/incomes.service';
import { PaginatedResultDto } from '@/pagination/dto/paginated-result.dto';
import { PaginationDto } from '@/pagination/dto/pagination.dto';
import { Order } from '@/pagination/enum/order.enum';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly debtsService: DebtsService,
    private readonly incomesService: IncomesService,
  ) {}

  async getTransactions(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<DebtDto | IncomeDto>> {
    const { limit, page, order } = paginationDto;

    const debts = (await this.debtsService.getAllDebts(userId)).map((debt) => ({
      type: 'debt',
      ...debt,
    }));
    const incomes = (await this.incomesService.getAllIncomes(userId)).map(
      (income) => ({
        type: 'income',
        ...income,
      }),
    );

    const transactions = [...debts, ...incomes].sort((a, b) => {
      return (
        new Date(order === Order.DESC ? b.createdAt : a.createdAt).getTime() -
        new Date(order === Order.DESC ? a.createdAt : b.createdAt).getTime()
      );
    });

    const totalItems = transactions.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = transactions.slice(startIndex, endIndex);

    return {
      currentPage: page,
      totalItems,
      itemsPerPage: limit,
      totalPages,
      data: paginatedData,
    };
  }
}
