import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const { closeHandler, totalAmount, totalItems, items, removeItem, addItem } =
    useContext(CartContext);

  const cartRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartAddHandler = (id, item) => {
    addItem({ ...item, count: 1, id });
  };

  const orderHandler = (e) => {
    setIsOrdering(true);
  };

  const cancelHandler = (e) => {
    setIsOrdering(false);
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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={closeHandler} className={classes["button--alt"]}>
        Close
      </button>
      {totalItems !== 0 && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {isOrdering && <Checkout onCancel={cancelHandler} />}
      {!isOrdering && modalActions}
    </Modal>
  );
};

export default Cart;
