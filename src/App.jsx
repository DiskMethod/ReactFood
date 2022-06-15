import React, { useContext } from "react";
import CartContext from "./store/cart-context";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const { showCart } = useContext(CartContext);

  return (
    <>
      {showCart && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
