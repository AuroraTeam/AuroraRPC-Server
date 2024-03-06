import { WithId } from "./utils/WithId";

export interface BaseErrorResponse {
    error: {
        code: ErrorCodes | number;
        message: string;
    };
}

export type ErrorResponse = WithId<BaseErrorResponse>;

export enum ErrorCodes {
    // JSON RPC 2.0 errors
    ParseError = -32700,
    InvalidRequest = -32600,
    MethodNotFound = -32601,
    InvalidParams = -32602,
    InternalError = -32603,
    // JSON RPC 2.0 errors - custom
    ResponseError = -32500,
}
