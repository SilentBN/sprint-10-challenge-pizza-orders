// RTK Query
import { CreateApi, fakeBaseQuery } from "@reduxjs/toolkit/query"; // imports two key function which are CreateApi and fakeBaseQuery

// Create and Exports the API Slice using the CreateApi function with an object that contains our API configuration.
export const apiSlice = CreateApi({
  reducerPath: "api", // The slice name for the reducer
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api/" }), // The base query function that will be used to send requests to the server (Wrapper for Fetch API)
  tagTypes: ["Orders"], // The tag types that will be used to cache invalidate
  // The endpoints that will be used to send requests to the server
  endpoints: (builder) => ({
    // This defines a query endpoint named getOrders: query: () => 'pizza/history' specifies the endpoint path; providesTags: ['Orders'] says this query provides 'Orders' data
    getOrders: builder.query({
      query: () => "pizza/history",
      providesTags: ["Orders"],
    }),
    // This defines a mutation endpoint named addOrder: It specifies the URL, method (POST), and that the body of the request should be the order argument
    addOrder: builder.mutation({
      query: (order) => ({
        url: "pizza/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"], // invalidatesTags: ['Orders'] means after this mutation, any queries tagged with 'Orders' should be refetched
    }),
  }),
});

// This exports auto-generated hooks for our endpoints. These hooks can be used in our components to perform the API calls.
export const { useGetOrdersQuery, useAddOrderMutation } = apiSlice;
