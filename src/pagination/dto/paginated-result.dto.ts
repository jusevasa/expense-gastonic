export class PaginatedResultDto<T> {
  data: T[];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}
