import React, { useState } from "react";

export const CartContext = React.createContext({
  showCart: false,
  openHandler: () => {},
  closeHandler: () => {},
});

const CartContextProvider = (props) => {
  const [showCart, setShowCart] = useState(false);

  const openHandler = (e) => {
    setShowCart(true);
  };

  const closeHandler = (e) => {
    setShowCart(false);
  };

  return (
    <CartContext.Provider value={{ showCart, openHandler, closeHandler }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
