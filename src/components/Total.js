import React, { useContext } from "react";
import { Context } from "../Context";

export default function Total({ data }) {
  const [items] = useContext(Context);
  console.log("DATA IS: ", data);
  const totalPrice = Object.keys(items).reduce((acc, curr) => {
    const [group, item] = curr.split("-");
    const amount = items[curr] * data[group][item].price;
    return acc + amount;
  }, 0);

  return (
    <div className="total">
      <span className="total-title">Total:</span>
      <span className="total-price">Ksh. {totalPrice}</span>
    </div>
  );
}
