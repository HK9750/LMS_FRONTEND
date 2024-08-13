import { apiSlice } from "../api/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `notifications`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    readNotification: builder.mutation({
      query: (notificationId) => ({
        url: `notification/update/${notificationId}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationApi;
