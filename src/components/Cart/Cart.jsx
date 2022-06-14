import React from "react";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";

const DUMMY_ITEMS = [
  {
    id: "c1",
    name: "Sushi",
    amount: 2,
    price: 12.99,
  },
];

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {DUMMY_ITEMS.map((item) => (
        <li key={`cart_${item.id}`}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        <button onClick={props.onOrder} className={classes.button}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
