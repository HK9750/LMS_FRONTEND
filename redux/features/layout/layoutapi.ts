import { apiSlice } from "../api/apiSlice";

const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query({
      query: (type) => ({
        url: `layout?type=${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createLayout: builder.mutation({
      query: (data) => ({
        url: `layout/create`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateLayout: builder.mutation({
      query: (data) => ({
        url: `layout/edit`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetLayoutQuery,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
} = layoutApi;
