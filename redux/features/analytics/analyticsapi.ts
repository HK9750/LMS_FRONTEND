import { apiSlice } from "../api/apiSlice";

const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: () => ({
        url: `analytics/user`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseAnalytics: builder.query({
      query: () => ({
        url: `analytics/course`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getOrderAnalytics: builder.query({
      query: () => ({
        url: `analytics/order`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetCourseAnalyticsQuery,
  useGetOrderAnalyticsQuery,
} = analyticsApi;
