import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const { openHandler, totalItems } = useContext(CartContext);

  return (
    <button onClick={openHandler} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
