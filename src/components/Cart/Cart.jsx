import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isPostingOrder, setIsPostingOrder] = useState(false);
  const [error, setError] = useState("");
  const {
    closeHandler,
    totalAmount,
    totalItems,
    items,
    removeItem,
    addItem,
    resetCart,
  } = useContext(CartContext);

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

  const postOrder = async (userData) => {
    try {
      setIsPostingOrder(true);
      const response = await fetch(
        "https://react-http-da165-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userData,
            order: { ...items, totalAmount },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }
      setError("none");
      setIsPostingOrder(false);
      resetCart();
    } catch (error) {
      setError(error.message);
      setIsPostingOrder(false);
    }
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

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {isOrdering && <Checkout order={postOrder} onCancel={cancelHandler} />}
      {!isOrdering && modalActions}
    </>
  );

  const isPostingOrderModalContent = <p>Sending order data...</p>;

  const postingOrderSuccessModalContent = <p>Successfully sent the order!</p>;

  return (
    <Modal>
      {!isPostingOrder && error === "" && cartModalContent}
      {isPostingOrder && isPostingOrderModalContent}
      {error === "none" && postingOrderSuccessModalContent}
    </Modal>
  );
};

export default Cart;
