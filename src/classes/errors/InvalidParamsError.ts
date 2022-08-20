import { ErrorCodes } from "../../types/ErrorResponse";
import { ResponseError } from "./ResponseError";

export class InvalidParamsError extends ResponseError {
    constructor(message?: string, code?: number) {
        super(message || "Invalid params", code || ErrorCodes.InvalidParams);
        this.name = this.constructor.name;
    }
}
