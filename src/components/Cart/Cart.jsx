import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const { closeHandler, totalAmount, totalItems, items, removeItem, addItem } =
    useContext(CartContext);

  const cartRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartAddHandler = (id, item) => {
    addItem({ ...item, count: 1, id });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Object.keys(items).map((key) => (
        <CartItem
          key={`cart_${key}`}
          item={items[key]}
          onRemove={cartRemoveHandler.bind(null, key)}
          onAdd={cartAddHandler.bind(null, key, items[key])}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={closeHandler} className={classes["button--alt"]}>
          Close
        </button>
        {totalItems !== 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
