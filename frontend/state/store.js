import { configureStore } from "@reduxjs/toolkit"; // This line imports the configureStore function from Redux Toolkit. This function simplifies the process of setting up a Redux store with good default settings.
import { apiSlice } from "./apiSlice"; // This imports the API slice we created earlier, which contains our RTK Query setup for handling API calls.
import filterSlice from "./filterSlice"; // This imports the filter slice we created earlier, which contains our filter state logic.

// This defines a function resetStore that creates and returns a new Redux store. This function is used to reset the store to its initial state, which can be useful in testing.
export const resetStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer, // This is a computed property name. It uses the reducerPath we defined in our API slice (which is 'api') as the key, and the API slice's reducer as the value.
      filter: filterSlice, // This adds our filter slice to the store. The key 'filter' will be used to access this slice's state in the store.
    },
    // This configures the middleware for our store: getDefaultMiddleware() returns the default middleware used by Redux Toolkit. We're adding the API slice middleware to this default set using concat. This middleware is necessary for RTK Query to work properly, handling things like caching and invalidation.
    middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  });

export const store = resetStore(); // This creates the actual store instance by calling resetStore(), and exports it so it can be used in our app.
