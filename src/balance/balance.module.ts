import { Module } from '@nestjs/common';

import { IncomesService } from '@/incomes/incomes.service';
import { FirebaseModule } from '@/firebase/firebase.module';
import { DebtsService } from '@/debts/debts.service';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { PaginationService } from '@/pagination/pagination.service';

@Module({
  imports: [FirebaseModule],
  controllers: [BalanceController],
  providers: [BalanceService, IncomesService, DebtsService, PaginationService],
})
export class BalanceModule {}
