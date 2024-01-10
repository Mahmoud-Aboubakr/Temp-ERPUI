export class PaginationResponseModel<T> {
    currentPage:number;
    errorMessage: string;
    lang:string;
    message:string;
    pageSize:number;
    statusCode: number;
    totalCount: number;
    totalPages: number;
    data: T;
}