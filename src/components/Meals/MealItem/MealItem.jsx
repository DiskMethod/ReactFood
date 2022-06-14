import React from "react";

import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const { name, description, price } = props.meal;
  const priceFixed = `$${price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceFixed}</div>
      </div>
      <div>
        <MealItemForm meal={props.meal} />
      </div>
    </li>
  );
};

export default MealItem;
