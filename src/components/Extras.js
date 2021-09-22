import React from "react";
import Input from "./Input";

export default function Extras({ type, items, setOrder }) {
  return (
    <section className="extras">
      <h2 className="extras-heading">{type}</h2>
      {items.map((item, index) => (
        <article className="menu-item" key={index}>
          <div className="extras-name">{item.name}</div>
          <Input setOrder={(value) => setOrder(value)} type={type} name={item.name} index={index} price={item.price}/>
          <strong className="extras-price">Ksh. {item.price}</strong>
        </article>
      ))}
    </section>
  );
}
