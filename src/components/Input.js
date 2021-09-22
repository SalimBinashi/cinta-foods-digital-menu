import React, { useContext } from "react";
import { Context } from "../Context";
import { OrdersContext } from "../OrdersContext";
import getTableNumber from "../helperFunctions/helperFunctionTables";

export default function Input({ type, name, index, price, setOrder }) {
  const [items, updateItem] = useContext(Context);
  // get items
  console.log("ITEMS:", items);
 // console.log("ORDERS:", orders);
  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={({ target }) => {
        updateItem(type, index, target.value);
        setOrder((prevState) => ({...prevState,
          table_number: getTableNumber(),
          orders: name,
          total: target.value * price
        }));
      }}
      name={name.replace(" ", "-").toLowerCase()}
    />
  );
}
