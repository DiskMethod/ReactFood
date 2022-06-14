import React, { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "./CartContext";

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
  const { closeHandler } = useContext(CartContext);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {DUMMY_ITEMS.map((item) => (
        <li key={`cart_${item.id}`}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={closeHandler} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
