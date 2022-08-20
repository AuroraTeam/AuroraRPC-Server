import { BaseErrorResponse, ErrorCodes } from "../../types/ErrorResponse";

export class ResponseError extends Error {
    private readonly code: number;

    constructor(message?: string, code?: number) {
        super(message || "Unknown response error");
        this.code = code || ErrorCodes.ResponseError;
        this.name = this.constructor.name;
    }

    toJSON(): BaseErrorResponse {
        return {
            error: {
                code: this.code,
                message: this.message,
            },
        };
    }
}
