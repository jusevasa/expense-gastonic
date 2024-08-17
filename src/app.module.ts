import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthGuard } from '@/auth/auth.guard';
import { BalanceModule } from '@/balance/balance.module';
import { DebtsModule } from '@/debts/debts.module';
import { FirebaseModule } from '@/firebase/firebase.module';
import { IncomesModule } from '@/incomes/incomes.module';
import { TransactionsModule } from '@/transaction/transactions.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    BalanceModule,
    DebtsModule,
    FirebaseModule,
    IncomesModule,
    TransactionsModule,
    PaginationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
