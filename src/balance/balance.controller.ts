import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { BalanceService } from './balance.service';

@ApiTags('Balance')
@ApiBearerAuth()
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ summary: 'Get balance for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  @Get(':userId')
  getBalance(@Param('userId') userId: string) {
    return this.balanceService.getBalance(userId);
  }
}
