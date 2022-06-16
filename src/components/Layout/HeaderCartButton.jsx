import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const { openHandler, totalItems } = useContext(CartContext);
  const [bump, setBump] = useState(false);

  const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;

  useEffect(() => {
    if (totalItems === 0) {
      return;
    }
    setBump(true);
    const timeout = setTimeout(() => {
      setBump(false);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [totalItems]);

  return (
    <button onClick={openHandler} className={btnClasses}>
      {console.log(btnClasses)}
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default HeaderCartButton;
