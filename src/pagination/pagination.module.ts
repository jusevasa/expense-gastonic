import { Module } from '@nestjs/common';

import { PaginationService } from './pagination.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [],
  providers: [PaginationService],
})
export class PaginationModule {}
