import { AbstractRequest } from "../types/AbstractRequest";
import { WebSocketClient } from "../types/Client";
import { ErrorResponse } from "../types/ErrorResponse";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import { ResponseError } from "./ResponseError";

export class RequestsManager {
    private requests: Map<string, AbstractRequest> = new Map();

    public registerRequest(request: AbstractRequest): void {
        this.requests.set(request.method, request);
    }

    public async getRequest(
        { params, method }: Request,
        ws: WebSocketClient
    ): Promise<Response | ErrorResponse> {
        if (!this.requests.has(method))
            return new ResponseError(102, "Unknown request method").toJSON();

        try {
            // // Проверка авторизации пользователя
            // // Если пользователь не авторизован - дропать, если запрос не с авторизацией
            // if (!ws.isAuthed && method !== "auth")
            //     throw new ResponseError(201, "Aвторизуйтесь");
            // // Если пользователь авторизован - дропать, если он пытается повторно авторизоваться, иначе скип
            // if (ws.isAuthed && method === "auth")
            //     throw new ResponseError(202, "Вы уже авторизованы");

            return {
                result: await this.requests.get(method)?.invoke(params, ws),
            };
        } catch (error) {
            if (error instanceof ResponseError) return error.toJSON();
            throw error; // TODO
        }
    }
}
