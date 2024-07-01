// OrderList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../state/apiSlice";
import { setFilter } from "../state/filterSlice";

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const currentSize = useSelector((state) => state.filter.size); // updated line

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {currentSize === "All"
          ? orders?.map((order) => {
              return (
                <li key={order.id}>
                  <div>
                    {order.customer} ordered a size {order.size} with
                    {order.toppings
                      ? order.toppings.map((topping, idx) => {
                          if (idx === order.toppings.length - 1) {
                            return ` ${idx + 1} ${
                              idx + 1 > 1 ? "toppings" : "topping"
                            }`;
                          }
                        })
                      : " no toppings"}
                  </div>
                </li>
              );
            })
          : orders?.map((order) => {
              if (order.size === currentSize)
                return (
                  <li key={order.id}>
                    <div>
                      {order.customer} ordered a size {order.size} with
                      {order.toppings
                        ? order.toppings.map((topping, idx) => {
                            if (idx === order.toppings.length - 1) {
                              return ` ${idx + 1} ${
                                idx + 1 > 1 ? "toppings" : "topping"
                              }`;
                            }
                          })
                        : " no toppings"}
                    </div>
                  </li>
                );
            })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${
            size === currentSize ? " active" : ""
          }`;
          return (
            <button
              onClick={() => dispatch(setFilter(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
