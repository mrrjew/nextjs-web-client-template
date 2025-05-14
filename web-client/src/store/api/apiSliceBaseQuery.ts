"use client";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query/react";
import { RetryConditionFunction } from "./apiSliceTypes";
import { AxiosResponse } from "axios";
import { fetch } from "./api";

export interface CustomAxiosResponse<T, D> extends AxiosResponse<T, D> {
  success?: boolean;
  status_code?: number;
}

const baseQueryHandler = async (
  requestOpts: Record<string, any>,
  { dispatch }: { dispatch: ThunkDispatch<any, any, any> },
  extraOptions = {},
) => {
  const { onError } = requestOpts;
  try {
    //params = GET call query-params
    //data = POST call body
    const {
      method,
      url,
      params = {},
      data = {},
      config = {},
      headers,
    } = requestOpts;

    const result = (await fetch({
      ...{ method, url, params, data, headers, ...config },
    })) as unknown as CustomAxiosResponse<any, any>;

    return {
      data: result?.data ? result.data : result,
      meta: {
        status_code: result?.status_code,
      },
    };
  } catch (error) {
    if (onError && typeof onError === "function") {
      onError(dispatch, error);
    }
    return { error };
  }
};

const trackRetryCondition: RetryConditionFunction = (
  error,
  args,
  { extraOptions, attempt },
) => {
  const maxRetries = extraOptions?.maxRetries;
  if (maxRetries) {
    if (attempt > maxRetries) {
      return false;
    }
    return true;
  }
  return false;
};

const staggeredBaseQuery = retry(baseQueryHandler, {
  retryCondition: trackRetryCondition,
});

export { staggeredBaseQuery };
