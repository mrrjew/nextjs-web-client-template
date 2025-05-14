import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "./useSession";

// interface FetchConfig {
//   headers?: Record<string, string>;
// }

// interface FetchParams {
//   url: string;
//   queryKey: QueryKey;
//   config?: FetchConfig;
//   data?: any;
//   enabled?: boolean;
// }

// export const useFetch = ({ url, config, data, queryKey, enabled }: FetchParams) => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(url, config);
//       return response.data;
//     } catch (error: any) {
//       console.log(error.response.data.data.error);
//     }
//   };

//   const {
//     data: responseData,
//     isLoading,
//     error,
//     isSuccess,
//     isError
//   } = useQuery({
//     queryKey,
//     queryFn: fetchData,
//     enabled
//   });
//   return { fetchData, isLoading, error, isSuccess, isError };
// };

// new fetch hook
interface FetchConfig {
  headers?: Record<string, string>;
}

interface FetchParams {
  url: string;
  queryKey: QueryKey;
  config?: FetchConfig;
  data?: any;
  enabled?: boolean;
}

export const useFetch = ({
  url,
  config,
  data,
  queryKey,
  enabled,
}: FetchParams) => {
  const fetchData = async () => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.data.error);
      return null;
    }
  };

  const {
    data: responseData,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useQuery({
    queryKey,
    queryFn: fetchData,
    enabled,
  });
  return { fetchData, isLoading, error, isSuccess, isError };
};

// create a hook with a generic type that can be passed as type of data in useFetch
// Path: ChisfisNextjs/src/hooks/useFetch.ts

interface FetchConfig {
  headers?: Record<string, string>;
}

interface FetchParamsType<T> {
  baseUrl?: string;
  endpoint: string;
  params?: Record<string, string>;
  queryParams?: Record<string, string>;
  queryKey: QueryKey;
  config?: FetchConfig;
}

// response type
interface RequestResponse<T> {
  action?: string;
  status: boolean;
  message: string;
  data: T | null;
}

export const useFetchData = <T>({
  baseUrl,
  endpoint,
  params,
  queryParams,
  queryKey,
  config,
}: FetchParamsType<T>) => {
  const { getSession } = useSession();

  const fetchData = async () => {
    try {
      let url = (baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL) + endpoint;
      let query = "";
      // add query params to the endpoint
      if (queryParams) {
        // remove empty values
        Object.keys(queryParams).forEach((key) => {
          if (
            [null, undefined, "", "null", "undefined"].includes(
              queryParams[key],
            )
          ) {
            delete queryParams[key];
          }
        });
        query = "?" + new URLSearchParams(queryParams).toString();
        url += query;
      }
      // add params to the endpoint
      if (params) {
        endpoint = endpoint.replace(/\/$/, "");
        endpoint += "/" + Object.values(params).join("/");
        url += query;
      }

      // remove double slashes using regex
      url = url.replace(/([^:]\/)\/+/g, "$1");
      const _config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getSession()?.token}`,
        },
        ...config,
      };
      const response = await axios.get(url, _config);
      if ([200, 201].includes(response.status)) {
        return response.data as RequestResponse<T>;
      }
      // console.log(`Error fetching data from ${endpoint}: ${response.statusText}`);
      return { status: false, message: "Error fetching data", data: null };
    } catch (error: any) {
      // console.log(
      //   `Error fetching data from ${endpoint}`
      // );
      return { status: false, message: "Error fetching data", data: null };
    }
  };

  const result = useQuery({
    queryFn: fetchData,
    queryKey,
    enabled: !!endpoint,
  });
  return {
    ...result,
    data: result?.data?.data ? result.data.data : null,
  };
};
