import { ServerOptions, WebSocketServer } from "ws";

import { WebSocketClient } from "../types/Client";
import { ErrorResponse } from "../types/ErrorResponse";
import { Request } from "../types/Request";
import { Response } from "../types/Response";
import { RequestsManager } from "./RequestsManager";

export class WebSocketManager {
    private webSocketServer: WebSocketServer;
    private requestsManager: RequestsManager;

    constructor(
        requestsManager: RequestsManager,
        wsServerOptions: ServerOptions
    ) {
        this.requestsManager = requestsManager;
        this.webSocketServer = new WebSocketServer(wsServerOptions);
        this.webSocketServer.on("connection", (ws: WebSocketClient) =>
            this.connectHandler(ws)
        );

        const interval = setInterval(() => {
            this.webSocketServer.clients.forEach((ws) => {
                const _ws = ws as WebSocketClient; // Странно работает strict в ts

                if (!_ws.isAlive) return _ws.terminate();

                _ws.isAlive = false;
                _ws.ping();
            });
        }, 10000);

        this.webSocketServer.on("close", () => {
            clearInterval(interval);
        });
    }

    private connectHandler(ws: WebSocketClient): void {
        ws.on("ping", ws.pong); // TODO check if this is needed
        ws.on("pong", () => (ws.isAlive = true));

        // Shortcut for sending a message to the client
        ws.sendResponse = (data: Response | ErrorResponse) => {
            ws.send(JSON.stringify(data));
        };

        ws.isAlive = true;

        // Handle incoming requests
        ws.on("message", async (message: string) => {
            console.log(`WebSocket request: ${message}`);
            let parsedMessage: Request;

            try {
                parsedMessage = JSON.parse(message);
            } catch (error) {
                return ws.sendResponse({
                    error: {
                        message: "Invalid JSON",
                        code: 100,
                    },
                });
            }

            if (parsedMessage.method === undefined) {
                return ws.sendResponse({
                    error: {
                        message: "Invalid request",
                        code: 101,
                    },
                });
            }

            const response = await this.requestsManager.getRequest(
                parsedMessage,
                ws
            );
            console.log(`WebSocket response: ${JSON.stringify(response)}`);
            ws.sendResponse({
                id: parsedMessage.id,
                ...response,
            });
        });
    }
}
