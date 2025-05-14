"use client";
import { apiSlice } from "./apiSlice";
import { hostMenuDropdownItemsTag } from "./apiTags";
import { ENTIRE_SESSION } from "./cacheTimes";

export const hostMenuDropdownApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHostMenuDropdown: builder.query({
      query: () => ({
        url: `/host_dashboard_seed/get-host-dashboard`,
        method: "GET",
      }),
      keepUnusedDataFor: ENTIRE_SESSION,
      providesTags: [hostMenuDropdownItemsTag],
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetHostMenuDropdownQuery, endpoints } =
  hostMenuDropdownApi;
