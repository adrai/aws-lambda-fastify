import { Context } from "aws-lambda";
import { FastifyInstance, LightMyRequestResponse } from "fastify";

type AwsLambdaFastify = typeof awsLambdaFastify

declare namespace awsLambdaFastify {
  export interface LambdaFastifyOptions {
    binaryMimeTypes?: string[];
    callbackWaitsForEmptyEventLoop?: boolean;
    serializeLambdaArguments?: boolean;
    decorateRequest?: boolean;
    decorationPropertyName?: string;
    enforceBase64?: (response: LightMyRequestResponse) => boolean;
    retainStage?: boolean;
    /**
     * usually set to 'proxy', if used
     */
    pathParameterUsedAsPath?: string;
    /**
     * Parse querystring with commas into an array of values.
     * Affects the behavior of the querystring parser with commas while using [Payload Format Version 2.0](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format)
     * 
     * e.g. when set to `true` (default) `?foo=qux,bar` => `{ foo: ['qux', 'bar'] }`
     * 
     * e.g. when set to `false` `?foo=qux,bar` => `{ foo: 'qux,bar' }`
     * @default true
     */
    parseCommaSeparatedQueryParams?: boolean;
  }
  
  export interface LambdaResponse {
    statusCode: number;
    body: string;
    headers: Record<string, string>;
    isBase64Encoded: boolean;
    cookies?: string[]
  }
  
  export type PromiseHandler<TEvent = any, TResult = LambdaResponse> = (
    event: TEvent,
    context: Context
  ) => Promise<TResult>;
  
  export type CallbackHandler<TEvent = any, TResult = LambdaResponse> = (
    event: TEvent,
    context: Context,
    callback: (err?: Error, result?: TResult) => void
  ) => void;
  
  export const awsLambdaFastify: AwsLambdaFastify
  export { awsLambdaFastify as default }
}

declare function awsLambdaFastify<TEvent, TResult = awsLambdaFastify.LambdaResponse>(
  app: FastifyInstance,
  options?: awsLambdaFastify.LambdaFastifyOptions
): awsLambdaFastify.PromiseHandler<TEvent, TResult>;

declare function awsLambdaFastify<TEvent, TResult = awsLambdaFastify.LambdaResponse>(
  app: FastifyInstance,
  options?: awsLambdaFastify.LambdaFastifyOptions
): awsLambdaFastify.CallbackHandler<TEvent, TResult>;

export = awsLambdaFastify
