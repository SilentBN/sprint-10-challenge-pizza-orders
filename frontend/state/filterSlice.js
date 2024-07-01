import { createSlice } from "@reduxjs/toolkit"; // imports the createSlice function from the Redux Toolkit library

const initialState = {
  size: "All",
};

// Creates a slice for filter state
export const filterSlice = createSlice({
  name: "filter", // The name of the slice
  initialState, // The initial state of the slice
  // Define Reducer Functions
  reducers: {
    // This defines a reducer function named setFilter: state is the current state (in this case, the current filter value) action is the action object dispatched to this reducer action.payload contains the new filter value The function simply returns the new filter value, replacing the old one
    setFilter: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions; // This exports the setFilter action creator. createSlice automatically generates action creators based on the reducer functions we defined.
export default filterSlice.reducer; // This exports the reducer function for our slice. This reducer will handle all actions related to the filter state.
