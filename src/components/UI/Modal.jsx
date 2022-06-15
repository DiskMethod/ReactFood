import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CartContext from "../../store/cart-context";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const { closeHandler } = useContext(CartContext);
  return <div onClick={closeHandler} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const container = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop />, container)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        container
      )}
    </div>
  );
};

export default Modal;
