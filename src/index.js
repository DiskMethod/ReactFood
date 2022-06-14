import ReactDOM from "react-dom/client";
import React from "react";
import CartContextProvider from "./components/Cart/CartContext";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>
);
