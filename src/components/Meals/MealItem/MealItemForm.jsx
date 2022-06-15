import React, { useRef, useContext } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const { addItem } = useContext(CartContext);
  const { id, name, price } = props.meal;

  const submitHandler = (e) => {
    e.preventDefault();
    addItem({ id, name, price, count: parseInt(inputRef.current.value) });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "max",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
