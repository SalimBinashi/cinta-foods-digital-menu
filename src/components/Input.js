import React, { useContext } from "react";
import { Context } from "../Context";
import { OrdersContext } from "../OrdersContext";

export default function Input({ type, name, index }) {
  const [items, updateItem] = useContext(Context);
  // get items
  // const [orders, updateOrder] = useContext(OrdersContext);
  console.log("ITEMS:", items);
  // console.log("ORDERS:", orders);
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={({ target }) => {
        updateItem(type, index, target.value);
        // updateOrder(type, name, target.value);
      }}
      name={name.replace(" ", "-").toLowerCase()}
    />
  );
}
