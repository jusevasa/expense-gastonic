import { Module } from '@nestjs/common';

import { FirebaseModule } from '@/firebase/firebase.module';
import { IncomesService } from '@/incomes/incomes.service';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';

@Module({
  imports: [FirebaseModule],
  controllers: [DebtsController],
  providers: [DebtsService, IncomesService],
})
export class DebtsModule {}
