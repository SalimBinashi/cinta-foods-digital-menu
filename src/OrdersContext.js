import React, { useState } from "react";

export const OrdersContext = React.createContext();

export const Provider = props => {
  const [orders, setOrders] = useState({});

  const updateOrder = (type, name, count) => {
    // const key = type;
    // console.log(key);
    const key = `${name.toLowerCase()}`;
    const amount = Number.isNaN(Number(count)) ? 0 : Number(count);

    setOrders({ ...orders, [key]: Number(amount)});
  };

  return (
    <OrdersContext.Provider value={[orders, updateOrder]}>
      {props.children}
    </OrdersContext.Provider>
  );
};
