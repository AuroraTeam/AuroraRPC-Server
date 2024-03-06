import { ServerOptions, WebSocketServer } from "ws";

import { AbstractRequest } from "../types/AbstractRequest";
import { WebSocketClient } from "../types/Client";
import { ErrorCodes, ErrorResponse } from "../types/ErrorResponse";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import { ResponseError } from "./errors/ResponseError";
import { RequestsManager } from "./RequestsManager";

export class Server {
    private webSocketServer: WebSocketServer;
    private requestsManager = new RequestsManager();

    // TODO Custom debug func
    constructor(
        options: ServerOptions,
        private debug = false,
    ) {
        this.webSocketServer = new WebSocketServer(options);

        this.webSocketServer.on("connection", (ws: WebSocketClient) =>
            this.connectHandler(ws),
        );

        const interval = setInterval(() => {
            (this.webSocketServer.clients as Set<WebSocketClient>).forEach(
                (ws) => {
                    if (!ws.isAlive) return ws.terminate();

                    ws.isAlive = false;
                    ws.ping();
                },
            );
        }, 30000);

        this.webSocketServer.on("close", () => clearInterval(interval));
    }

    public registerRequest(request: AbstractRequest): void {
        this.requestsManager.registerRequest(request);
    }

    private connectHandler(ws: WebSocketClient): void {
        ws.on("ping", ws.pong);
        ws.on("pong", () => (ws.isAlive = true));

        // Shortcut for sending a message to the client
        ws.sendResponse = (data: Response | ErrorResponse) => {
            ws.send(JSON.stringify(data));
        };

        ws.isAlive = true;

        // Handle incoming requests
        ws.on("message", async (message: string) => {
            if (this.debug) console.log(`WebSocket request: ${message}`);

            let parsedMessage: Request;

            try {
                parsedMessage = JSON.parse(message);
            } catch (error) {
                return ws.sendResponse(
                    new ResponseError(
                        "Parse error",
                        ErrorCodes.ParseError,
                    ).toJSON(),
                );
            }

            if (typeof parsedMessage.method !== "string") {
                return ws.sendResponse(
                    new ResponseError(
                        "Invalid request",
                        ErrorCodes.InvalidRequest,
                    ).toJSON(),
                );
            }

            const response = await this.requestsManager.getRequest(
                parsedMessage,
                ws,
            );

            if (this.debug) {
                console.log(`WebSocket response: ${JSON.stringify(response)}`);
            }

            ws.sendResponse({
                ...response,
                id: parsedMessage.id,
            });
        });
    }
}
