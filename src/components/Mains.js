import React from "react";
import Input from "./Input";

export default function Mains({ meals, setOrder }) {
  
  console.log("MEALS: ",meals);
  return (
    <section className="mainMeals">
      {meals.map((meal, index) => (
        <article className="menu-item" key={index}>
          <h3 className="mains-name">{meal.name}</h3>
          <Input  setOrder={(value) => setOrder(value)} type="mains" name={meal.name} index={index} price={meal.price}/>
          <strong className="mains-price">${meal.price}</strong>
          <p className="mains-description">{meal.description}</p>
        </article>
      ))}
    </section>
  );
}
