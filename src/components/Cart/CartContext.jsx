import React, { useState } from "react";
import CartContext from "../../store/cart-context";

const CartContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const openHandler = (e) => {
    setShowCart(true);
  };

  const closeHandler = (e) => {
    setShowCart(false);
  };

  const addItem = (item) => {
    setItems((prevItems) => {
      return {
        ...prevItems,
        [item.id]: {
          name: item.name,
          price: item.price,
          count: item.count,
        },
      };
    });
    setTotalAmount(
      (totalAmount) => Math.round((totalAmount + item.price) * 100) / 100
    );
    setTotalCount((prevCount) => prevCount + item.count);
  };

  // TODO
  const removeItem = (id) => {
    return;
  };

  const cartContextValue = {
    showCart,
    openHandler,
    closeHandler,
    items,
    totalCount,
    totalAmount,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
