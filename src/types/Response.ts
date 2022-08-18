// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseResult = any;

export interface BaseResponse {
    result: ResponseResult;
}

export interface Response extends BaseResponse {
    id?: number | string;
}
