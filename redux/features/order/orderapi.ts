import { apiSlice } from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `order/create`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "stripeapi",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: ({ amount }) => ({
        url: "stripepayment",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
} = orderApi;
