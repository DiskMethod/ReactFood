import React, { useState } from "react";
import CartContext from "../../store/cart-context";

const getTotalAmount = (items) => {
  return Object.keys(items).reduce((acc, curr) => {
    return (
      Math.round((acc + items[curr].price * items[curr].count) * 100) / 100
    );
  }, 0);
};

const getTotalItems = (items) => {
  return Object.keys(items).reduce((acc, curr) => {
    return acc + items[curr].count;
  }, 0);
};

const CartContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState({});

  const openHandler = (e) => {
    setShowCart(true);
  };

  const closeHandler = (e) => {
    setShowCart(false);
  };

  const addItem = (item) => {
    setItems((prevItems) => {
      let prevCount = 0;
      if (item.id in prevItems) {
        prevCount = prevItems[item.id].count;
      }
      return {
        ...prevItems,
        [item.id]: {
          name: item.name,
          price: item.price,
          count: prevCount + item.count,
        },
      };
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) => {
      const temp = { ...prevItems };
      delete temp[id];
      return temp;
    });
  };

  const cartContextValue = {
    showCart,
    openHandler,
    closeHandler,
    items,
    totalItems: getTotalItems(items),
    totalAmount: getTotalAmount(items),
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
