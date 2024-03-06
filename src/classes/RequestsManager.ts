import { AbstractRequest } from "../types/AbstractRequest";
import { WebSocketClient } from "../types/Client";
import { ErrorCodes, ErrorResponse } from "../types/ErrorResponse";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import { ResponseError } from "./errors/ResponseError";

export class RequestsManager {
    #requests: Map<string, AbstractRequest> = new Map();

    registerRequest(request: AbstractRequest): void {
        if (this.#requests.has(request.method)) {
            throw new Error(
                `Request with method ${request.method} already registered`,
            );
        }
        this.#requests.set(request.method, request);
    }

    async getRequest(
        { params, method }: Request,
        ws: WebSocketClient,
    ): Promise<Response | ErrorResponse> {
        const request = this.#requests.get(method);

        if (!request) {
            return new ResponseError(
                "Method not found",
                ErrorCodes.MethodNotFound,
            ).toJSON();
        }

        try {
            return { result: await request.invoke(params, ws) };
        } catch (error) {
            if (error instanceof ResponseError) return error.toJSON();
            console.error(error);
            return new ResponseError(
                "Internal error",
                ErrorCodes.InternalError,
            ).toJSON();
        }
    }
}
