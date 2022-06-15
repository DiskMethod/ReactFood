import React from "react";

const CartContext = React.createContext({
  showCart: false,
  openHandler: () => {},
  closeHandler: () => {},
  items: {},
  totalItems: 0,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
