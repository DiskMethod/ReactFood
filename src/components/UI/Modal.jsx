import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
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
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, container)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        container
      )}
    </div>
  );
};

export default Modal;
