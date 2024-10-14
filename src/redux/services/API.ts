import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});
// providesTags: ["auth"],
// invalidatesTags: ["auth"],
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["auth", "product", "order"],
  endpoints: (builder) => ({
    //overview
    adminOverview: builder.query({
      query: () => ({ url: `admin-overview`, method: "GET" }),
      providesTags: ["auth", "product", "order"],
    }),
    buyerOverview: builder.query({
      query: (email: string) => ({
        url: `buyer-overview/${email}`,
        method: "GET",
      }),
      providesTags: ["product", "order"],
    }),
    sellerOverview: builder.query({
      query: (id: string) => ({ url: `seller-overview/${id}`, method: "GET" }),
      providesTags: ["product", "order"],
    }),
    //order
    deleteOrder: builder.mutation({
      query: (id) => ({ url: `order/${id}`, method: "DELETE" }),
      invalidatesTags: ["order"],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
    getOrders: builder.query({
      query: (email: string) => ({ url: `orders/${email}`, method: "GET" }),
      providesTags: ["order"],
    }),
    getOrder: builder.query({
      query: (id: string) => ({ url: `order/${id}`, method: "GET" }),
      providesTags: ["order"],
    }),
    //product
    detailProduct: builder.query({
      query: (id) => ({ url: `detail-product/${id}`, method: "GET" }),
      providesTags: ["product"],
    }),
    advertiseProduct: builder.mutation({
      query: (id) => ({ url: `advertise-product/${id}`, method: "PUT" }),
      invalidatesTags: ["product"],
    }),
    reportProduct: builder.mutation({
      query: (id) => ({ url: `report-product/${id}`, method: "PUT" }),
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({ url: "product", method: "POST", body: data }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `product/${id}`, method: "DELETE" }),
      invalidatesTags: ["product"],
    }),
    getReportedProducts: builder.query({
      query: () => ({
        url: "all-reported-products",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getSellersProducts: builder.query({
      query: (id: string) => ({
        url: `seller-products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getCategoryProducts: builder.query({
      query: (id: string) => ({
        url: `category-products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    advertisedProducts: builder.query({
      query: () => ({ url: "advertise-products", method: "GET" }),
      providesTags: ["product"],
    }),
    // category

    getCategory: builder.query({
      query: () => ({ url: "category", method: "GET" }),
    }),
    //user

    verifySeller: builder.mutation({
      query: (id) => ({ url: `verify-seller/${id}`, method: "PUT" }),
      invalidatesTags: ["auth"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `user/${id}`, method: "DELETE" }),
      invalidatesTags: ["auth"],
    }),
    getAllBuyer: builder.query({
      query: () => ({ url: "all-buyer", method: "GET" }),
      providesTags: ["auth"],
    }),
    getAllSeller: builder.query({
      query: () => ({ url: "all-seller", method: "GET" }),
      providesTags: ["auth"],
    }),
    createUser: builder.mutation({
      query: (userData) => ({ url: "user", method: "POST", body: userData }),
      invalidatesTags: ["auth"],
    }),
    createUserByGoogle: builder.mutation({
      query: (data) => ({
        url: "google-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({ url: "login", method: "POST", body: userData }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useAdminOverviewQuery,
  useBuyerOverviewQuery,
  useSellerOverviewQuery,
  useDetailProductQuery,
  useGetOrderQuery,
  useAdvertiseProductMutation,
  useVerifySellerMutation,
  useDeleteOrderMutation,
  useReportProductMutation,
  useGetOrdersQuery,
  useGetSellersProductsQuery,
  useCreateProductMutation,
  useGetReportedProductsQuery,
  useGetAllBuyerQuery,
  useGetAllSellerQuery,
  useCreateOrderMutation,
  useGetCategoryProductsQuery,
  useAdvertisedProductsQuery,
  useCreateUserByGoogleMutation,
  useGetCategoryQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useDeleteProductMutation,
} = baseApi;
