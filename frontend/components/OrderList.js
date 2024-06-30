import React from "react"; // imports the React library
import { useSelector, useDispatch } from "react-redux"; // imports the useSelector and useDispatch hooks from React Redux
import { useGetOrdersQuery } from "../state/apiSlice"; // imports the useGetOrdersQuery hook from our API slice
import { setFilter } from "../state/filterSlice"; // imports the setFilter action creator from our filter slice

// This defines our OrderList component as a function component.
export default function OrderList() {
  // This line uses the useGetOrdersQuery hook to fetch orders from the API: - data: orders = [] renames the data property to orders and provides an empty array as a default value - isLoading and isError are flags indicating the query status
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();
  const filter = useSelector((state) => state.filter); // This uses the useSelector hook to get the current filter value from the Redux store.
  const dispatch = useDispatch(); // This gets the dispatch function from Redux, which we'll use to dispatch actions.

  const filteredOrders = orders.filter(
    (order) => filter === "All" || order.size === filter
  ); // This filters the orders based on the current filter value.

  // These lines handle loading and error states for the API query.
  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {/* This maps over the filtered orders and renders a list item for each order. */}
        {filteredOrders.map((order) => {
          return (
            <li key={order.id}>
              <div>
                {order.customer} ordered a size {order.size} pizza with{" "}
                {order.toppings?.length || "no"} topping
                {order.toppings?.length !== 1 ? "s" : ""}
              </div>
            </li>
          );
        })}
      </ol>
      {/* This section renders filter buttons for different sizes. */}
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${size === filter ? " active" : ""}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setFilter(size))}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
