import { BaseErrorResponse } from "../types/ErrorResponse";

export class ResponseError extends Error {
    private readonly code: number;

    constructor(code?: number, message?: string) {
        super(message || "Unknown response error");
        this.code = code || 100;
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
