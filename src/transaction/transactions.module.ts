import { Module } from '@nestjs/common';

import { DebtsService } from '@/debts/debts.service';
import { IncomesService } from '@/incomes/incomes.service';
import { FirebaseModule } from '@/firebase/firebase.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [FirebaseModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, DebtsService, IncomesService],
})
export class TransactionsModule {}
