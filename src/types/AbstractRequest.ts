import { WebSocketClient } from "./Client";
import { PromiseOr } from "./PromiseOr";
import { RequestParams } from "./Request";
import { ResponseResult } from "./Response";

export abstract class AbstractRequest {
    public abstract readonly method: string;

    public abstract invoke(
        data: RequestParams,
        ws: WebSocketClient
    ): PromiseOr<ResponseResult>;
}
