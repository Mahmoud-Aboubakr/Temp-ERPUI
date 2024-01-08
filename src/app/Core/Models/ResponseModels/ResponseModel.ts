export class ResponseModel<T> {
    message: string;
    statusCode: number;
    executionDate: Date;
    succeeded: boolean;
    data: T;
    total: number;
}