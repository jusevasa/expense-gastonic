import { Module } from '@nestjs/common';

import { FirebaseModule } from '@/firebase/firebase.module';
import { IncomesService } from '@/incomes/incomes.service';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';
import { PaginationService } from '@/pagination/pagination.service';

@Module({
  imports: [FirebaseModule],
  controllers: [DebtsController],
  providers: [DebtsService, IncomesService, PaginationService],
})
export class DebtsModule {}
