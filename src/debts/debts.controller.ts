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

import { successResponse, errorResponse } from '@/utils/response.helper';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@ApiTags('Debts')
@ApiBearerAuth()
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @ApiOperation({ summary: 'Get all debts for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  async getAllDebts(@Param('userId') userId: string) {
    try {
      const debts = await this.debtsService.getAllDebts(userId);
      return successResponse('Debts retrieved successfully', debts);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve debts',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get total debt amount for an income' })
  @ApiParam({ name: 'incomeId', description: 'ID of the income' })
  @Get('total-amount/:incomeId')
  async getTotalDebtAmountForIncome(@Param('incomeId') incomeId: string) {
    try {
      const totalAmount =
        await this.debtsService.getTotalDebtAmountForIncome(incomeId);
      return successResponse(
        'Total debt amount retrieved successfully',
        totalAmount,
      );
    } catch (error) {
      return errorResponse(
        'Failed to retrieve total debt amount',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get total amount of debts for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get('/total/:userId')
  async getTotalDebtAmountForUser(@Param('userId') userId: string) {
    try {
      const totalDebt =
        await this.debtsService.getTotalDebtAmountForUser(userId);
      return successResponse('Total debt amount retrieved successfully', {
        totalDebt,
      });
    } catch (error) {
      return errorResponse(
        'Failed to retrieve total debt amount',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get last debt for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId/last')
  async getLastDebt(@Param('userId') userId: string) {
    try {
      const getLastDebt = await this.debtsService.getLastDebt(userId);
      return successResponse('Found last debt successfully', {
        getLastDebt,
      });
    } catch (error) {
      return errorResponse(
        'Failed to retrieve debts',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Get a debt by ID' })
  @ApiParam({ name: 'debtId', description: 'ID of the debt' })
  @Get('/debt/:debtId')
  async getDebtById(@Param('debtId') debtId: string) {
    try {
      const debt = await this.debtsService.getDebtById(debtId);
      return successResponse('Debt retrieved successfully', debt);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve debt',
        HttpStatus.NOT_FOUND, // Assuming debt not found should return 404
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Add a new debt for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @ApiBody({ type: CreateDebtDto })
  @Post(':userId')
  async addDebt(
    @Param('userId') userId: string,
    @Body() createDebtDto: CreateDebtDto,
  ) {
    try {
      const newDebt = await this.debtsService.addDebt(userId, createDebtDto);
      return successResponse('Debt created successfully', newDebt);
    } catch (error) {
      return errorResponse(
        'Failed to create debt',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Update a debt for a user' })
  @ApiParam({ name: 'debtId', description: 'ID of the debt' })
  @ApiBody({ type: UpdateDebtDto })
  @Put(':debtId')
  async updateDebt(
    @Param('debtId') debtId: string,
    @Body() updateDebtDto: UpdateDebtDto,
  ) {
    try {
      const updatedDebt = await this.debtsService.updateDebt(
        debtId,
        updateDebtDto,
      );
      return successResponse('Debt updated successfully', updatedDebt);
    } catch (error) {
      return errorResponse(
        'Failed to update debt',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }

  @ApiOperation({ summary: 'Delete a debt for a user' })
  @ApiParam({ name: 'debtId', description: 'ID of the debt' })
  @Delete(':debtId')
  async deleteDebt(@Param('debtId') debtId: string) {
    try {
      await this.debtsService.deleteDebt(debtId);
      return successResponse('Debt deleted successfully');
    } catch (error) {
      return errorResponse(
        'Failed to delete debt',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }
}
