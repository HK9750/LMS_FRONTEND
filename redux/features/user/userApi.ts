import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "update-avatar",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "update/password",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "forgot",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "reset",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "users/admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `update-role/${id}`,
        method: "PUT",
        body: { role },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetAllUsersQuery,
  useResetPasswordMutation,
  useUpdateAvatarMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useUpdateRoleMutation,
} = userApi;
