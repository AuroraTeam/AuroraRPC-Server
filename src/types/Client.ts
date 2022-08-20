import WebSocket from "ws";

import { ErrorResponse } from "./ErrorResponse";
import { Response } from "./Response";

export interface WebSocketClient extends WebSocket {
    isAlive: boolean;

    sendResponse: (response: Response | ErrorResponse) => void;
}
