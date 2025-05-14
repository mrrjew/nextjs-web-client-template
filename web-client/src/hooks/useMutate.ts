import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "./useSession";
import { createToast } from "@/utils/createToast";

interface MutateConfigs {
  headers?: Record<string, string>;
}

interface MutateParamsType<T> {
  baseUrl?: string;
  endpoint: string;
  params?: Record<string, string>;
  queryParams?: Record<string, string>;
  body?: Record<string, any>;
  queryKey: QueryKey;
  config?: MutateConfigs;
}

// response type
interface RequestResponse<T> {
  action?: string;
  status: boolean;
  message: string;
  data: T | null;
}

export const useMutateData = <T>({
  baseUrl,
  endpoint,
  params,
  queryParams,
  body,
  queryKey,
}: MutateParamsType<T>) => {
  const { getSession } = useSession();
  const queryClient = useQueryClient();

  const mutateData = async () => {
    try {
      // const formData = new FormData();
      let url = (baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL) + endpoint;
      let query = "";
      // add query params to the endpoint
      if (queryParams) {
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
        // ...(config || {})
      };
      // console.log("_config type: ", typeof _config)
      // console.log("Body type: ", typeof body)
      // add body to the form data
      const response = await axios.post(url, JSON.stringify(body), _config);
      console.log(response.data);
      // check if the response is successful and show toast
      if (response?.data?.status) {
        console.log(response.data.data);
        createToast(response.data.message, "success");
      }
      if (!response?.data?.status) {
        console.log(response.data.data);
        createToast(response.data.message, "error");
      }

      return response.data as RequestResponse<T>;
    } catch (error: any) {
      createToast(error.response.data.message, "error");
      console.log(error.response.data);
      return null;
    } finally {
      queryClient.invalidateQueries({ queryKey: queryKey });
    }
  };

  return useMutation({
    mutationFn: mutateData,
  });
};

export const useSubmitMutateData = <T>({
  baseUrl,
  endpoint,
  params,
  queryParams,
  queryKey,
}: MutateParamsType<T>) => {
  const { getSession } = useSession();
  const queryClient = useQueryClient();

  const mutateData = async ({ data }: { data: T }) => {
    try {
      // const formData = new FormData();
      let url = (baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL) + endpoint;
      let query = "";
      // add query params to the endpoint
      if (queryParams) {
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
        // ...(config || {})
      };
      // console.log("_config type: ", typeof _config)
      // console.log("Body type: ", typeof body)
      // add body to the form data
      const response = await axios.post(url, JSON.stringify({ data }), _config);
      console.log(response.data);
      // check if the response is successful and show toast
      if (response?.data?.status) {
        console.log(response.data.data);
        createToast(response.data.message, "success");
      }
      if (!response?.data?.status) {
        console.log(response.data.data);
        createToast(response.data.message, "error");
      }

      return response.data as RequestResponse<T>;
    } catch (error: any) {
      createToast(error.response.data.message, "error");
      console.log(error.response.data);
      return null;
    } finally {
      queryClient.invalidateQueries({ queryKey: queryKey });
    }
  };

  return useMutation({
    mutationFn: mutateData,
  });
};
