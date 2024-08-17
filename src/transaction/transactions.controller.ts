import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';

import { TransactionsService } from './transactions.service';
import { Order } from '@/pagination/enum/order.enum';
import { PaginationDto } from '@/pagination/dto/pagination.dto';
import { PaginatedResultDto } from '@/pagination/dto/paginated-result.dto';
import { DebtDto } from '@/debts/dto/debt.dto';
import { IncomeDto } from '@/incomes/dto/income.dto';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':userId')
  @ApiParam({ name: 'userId', example: 'user123' })
  @ApiQuery({ name: 'limit', example: 10, required: false })
  @ApiQuery({ name: 'page', example: 1, required: false })
  @ApiQuery({
    name: 'order',
    example: Order.DESC,
    enum: Order,
    required: false,
  })
  @ApiOkResponse({
    description: 'Successful retrieval of transactions',
    type: PaginatedResultDto,
  })
  async getTransactions(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<DebtDto | IncomeDto>> {
    return this.transactionsService.getTransactions(userId, paginationDto);
  }
}
