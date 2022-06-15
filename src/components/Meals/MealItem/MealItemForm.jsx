import React, { useState, useContext } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [inputValue, setInputValue] = useState("1");
  const { addItem } = useContext(CartContext);
  const { id, name, price } = props.meal;

  const submitHandler = (e) => {
    e.preventDefault();
    addItem({ id, name, price, count: parseInt(inputValue) });
    setInputValue("1");
  };

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "max",
          step: "1",
          value: inputValue,
          onChange: changeHandler,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
