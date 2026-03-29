export class PaginationResult<T> {
  constructor(
    public readonly data: T[],
    public readonly totalRecord: number,
    public readonly currentPage: number,
    public readonly pageSize: number,
  ) {}

  get totalPages(): number {
    return Math.ceil(this.totalRecord / this.pageSize);
  }
}
