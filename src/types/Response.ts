import { JsonValue } from "./utils/Json";
import { WithId } from "./utils/WithId";

export type ResponseResult = JsonValue;

export interface BaseResponse {
    result: ResponseResult;
}

export type Response = WithId<BaseResponse>;
