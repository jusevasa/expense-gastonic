import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { TransactionsService } from './transactions.service';
import { errorResponse, successResponse } from '@/utils/response.helper';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({
    summary: 'Get all transactions for a user (incomes and debts)',
  })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  async getAllTransactions(@Param('userId') userId: string) {
    try {
      const incomes = await this.transactionsService.getTransactions(userId);
      return successResponse('Transactions retrieved successfully', incomes);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve transactions',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }
}
