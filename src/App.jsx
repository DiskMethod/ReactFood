import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  const openCartHandler = (e) => {
    setShowCart(true);
  };

  const closeCartHandler = (e) => {
    setShowCart(false);
  };

  const orderCartHandler = (e) => {
    return;
  };

  return (
    <>
      {showCart && (
        <Cart onClose={closeCartHandler} onOrder={orderCartHandler} />
      )}
      <Header onOpen={openCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
