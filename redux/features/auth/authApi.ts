import { apiSlice } from "../api/apiSlice";
import {
  updateAccessToken,
  userActivation,
  userLogin,
  userLogout,
  userRegistration,
} from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistration({ token: result.data.token }));
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    activate: builder.mutation({
      query: (data) => ({
        url: "activate",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userActivation({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    socialLogin: builder.mutation({
      query: (data) => ({
        url: "social",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
        } catch (error: any) {
          console.error(error.message);
        }
      },
    }),
    updateAccessToken: builder.mutation({
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

export const {
  useActivateMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSocialLoginMutation,
} = authApi;
