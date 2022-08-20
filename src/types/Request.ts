import { JsonValue } from "./utils/Json";
import { WithId } from "./utils/WithId";

export type RequestParams = JsonValue;

export interface BaseRequest {
    method: string;
    params?: RequestParams;
}

export type Request = WithId<BaseRequest>;
