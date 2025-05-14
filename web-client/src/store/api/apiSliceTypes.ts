"use client";
export type ReduxDispatch = (dispatchAction: any) => void;

interface ExtraOptions {
  maxRetries?: number;
}

export interface RetryArgs {
  method: string;
  url: string;
}

export type RetryConditionFunction = (
  error: unknown,
  args: RetryArgs,
  extraArgs: {
    attempt: number;
    baseQueryApi: unknown;
    extraOptions: ExtraOptions;
  },
) => boolean;
