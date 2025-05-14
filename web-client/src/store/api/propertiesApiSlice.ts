"use client";
import { apiSlice } from "./apiSlice";
import { rentableItemsTag } from "./apiTags";
import { ENTIRE_SESSION } from "./cacheTimes";

export const propertyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: () => ({
        url: `/v1/properties/get-all-properties`,
        method: "GET",
      }),
      keepUnusedDataFor: ENTIRE_SESSION,
      providesTags: [rentableItemsTag],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllPropertiesQuery } = propertyApiSlice;
