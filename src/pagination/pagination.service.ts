import { Injectable } from '@nestjs/common';

import { FirebaseRepository } from '../firebase/firebase.repository';
import { Order } from './enum/order.enum';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResultDto } from './dto/paginated-result.dto';

@Injectable()
export class PaginationService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async paginate<T>(
    collection: string,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<T>> {
    const {
      userId,
      limit = 10,
      page = 1,
      order = Order.DESC,
      filters = {},
    } = paginationDto;

    let query = this.firebaseRepository
      .getCollection(collection)
      .where('userId', '==', userId)
      .orderBy('createdAt', order);

    for (const [field, value] of Object.entries(filters)) {
      query = query.where(field, '==', value);
    }

    const offset = (page - 1) * limit;
    const collectionSnapshot = await query.offset(offset).limit(limit).get();
    const totalItems = (await query.get()).size;
    const totalPages = Math.ceil(totalItems / limit);

    const data = collectionSnapshot.docs.map((doc) => doc.data() as T);

    return {
      currentPage: page,
      totalItems,
      itemsPerPage: limit,
      totalPages,
      data,
    };
  }
}
