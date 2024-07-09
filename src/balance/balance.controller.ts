import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { BalanceService } from './balance.service';
import { errorResponse, successResponse } from '@/utils/response.helper';

@ApiTags('Balance')
@ApiBearerAuth()
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ summary: 'Get balance for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  async getBalance(@Param('userId') userId: string) {
    try {
      const balance = await this.balanceService.getBalance(userId);
      return successResponse('Balance retrieved successfully', balance);
    } catch (error) {
      return errorResponse(
        'Failed to retrieve balance',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { error: error.message },
      );
    }
  }
}
