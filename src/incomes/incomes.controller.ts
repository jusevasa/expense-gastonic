import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import {
  createdResponse,
  errorResponse,
  successResponse,
} from '@/utils/response.helper';
import { IncomesService } from './incomes.service';
import { UpdateIncomeDto } from './dto/update-payment.dto';
import { CreateIncomeDto } from './dto/create-income.dto';

@ApiTags('Incomes')
@ApiBearerAuth()
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @ApiOperation({ summary: 'Get all incomes for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  async getAllIncomes(@Param('userId') userId: string) {
    try {
      const incomes = await this.incomesService.getAllIncomes(userId);
      return successResponse('Incomes retrieved successfully', incomes);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve incomes',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get all incomes for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  async getIncomeById(@Param('incomeId') incomeId: string) {
    try {
      const income = await this.incomesService.getIncomeById(incomeId);
      return successResponse('Income retrieved successfully', income);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve income',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get total amount of incomes for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get('/total/:userId')
  async getTotalIncomeAmountForUser(@Param('userId') userId: string) {
    try {
      const totalIncome =
        await this.incomesService.getTotalIncomeAmountForUser(userId);
      return successResponse('Total income amount retrieved successfully', {
        totalIncome,
      });
    } catch (error) {
      return errorResponse(
        'Failed to retrieve total income amount',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Add a new income for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiBody({ type: CreateIncomeDto })
  @Post(':userId')
  async addIncome(
    @Param('userId') userId: string,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    try {
      const newDebt = await this.incomesService.addIncome(
        userId,
        createIncomeDto,
      );
      return createdResponse('Income created successfully', newDebt);
    } catch (error) {
      return errorResponse(
        'Failed to create Income',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Update an income for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiParam({ name: 'incomeId', description: 'ID of the income' })
  @ApiBody({ type: UpdateIncomeDto })
  @Put(':incomeId')
  async updateIncome(
    @Param('incomeId') incomeId: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    try {
      const updateIncome = await this.incomesService.updateIncome(
        incomeId,
        updateIncomeDto,
      );
      return successResponse('Income updated successfully', updateIncome);
    } catch (error) {
      return errorResponse(
        'Failed to update Income',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Delete an income for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiParam({ name: 'incomeId', description: 'ID of the income' })
  @Delete(':incomeId')
  async deleteIncome(@Param('incomeId') incomeId: string) {
    try {
      await this.incomesService.deleteIncome(incomeId);
      return successResponse('Income deleted successfully');
    } catch (error) {
      return errorResponse(
        'Failed to delete Income',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }
}
