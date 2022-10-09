import { WithId } from "./utils/WithId";

export type ResponseResult = unknown;

export interface BaseResponse {
    result: ResponseResult;
}

export type Response = WithId<BaseResponse>;
