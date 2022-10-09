import { WithId } from "./utils/WithId";

export type RequestParams = unknown;

export interface BaseRequest {
    method: string;
    params?: RequestParams;
}

export type Request = WithId<BaseRequest>;
