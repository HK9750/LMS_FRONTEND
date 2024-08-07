import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
  }),
});
