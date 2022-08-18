// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestParams = any;

export interface BaseRequest {
    method: string;
    params: RequestParams;
}

export interface Request extends BaseRequest {
    id?: number | string;
}
