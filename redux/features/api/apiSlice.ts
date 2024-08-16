import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateAccessToken } from "../auth/authSlice";
import { getUser } from "../user/userSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URI,
  }),
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
          dispatch(
            getUser({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    updateAccessToken: builder.query({
      query: (data) => ({
        url: "update/token",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateAccessToken({ accessToken: result.data.accessToken }));
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
  }),
});

export const { useLoadUserQuery, useUpdateAccessTokenQuery } = apiSlice;
