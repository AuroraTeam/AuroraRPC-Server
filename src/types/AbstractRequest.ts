import { WebSocketClient } from "./Client";
import { RequestParams } from "./Request";
import { ResponseResult } from "./Response";
import { PromiseOr } from "./utils/PromiseOr";

export abstract class AbstractRequest {
    public abstract readonly method: string;

    public abstract invoke(
        ws: WebSocketClient,
        data?: RequestParams
    ): PromiseOr<ResponseResult>;
}
