import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const { closeHandler, totalAmount, items, removeItem } =
    useContext(CartContext);

  const cartClickHandler = (e) => {
    removeItem(e.target.id.split("_")[1]);
  };

  const cartItems = (
    <ul className={classes["cart-items"]} onClick={cartClickHandler}>
      {Object.keys(items).map((key) => (
        <li key={`cart_${key}`} id={`cart_${key}`}>
          {items[key].name} {items[key].count}
        </li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
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
