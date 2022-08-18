export interface BaseErrorResponse {
    error: {
        code: number;
        message: string;
    };
}

export interface ErrorResponse extends BaseErrorResponse {
    id?: number | string;
}
