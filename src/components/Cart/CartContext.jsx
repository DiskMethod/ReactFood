import React, { useReducer } from "react";
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

const cartReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return { ...state, showCart: true };
    case "CLOSE":
      return { ...state, showCart: false };
    case "ADD":
      let prevCount = 0;
      if (action.id in state.items) {
        prevCount = state.items[action.id].count;
      }
      const newItems = {
        ...state.items,
        [action.id]: {
          name: action.name,
          price: action.price,
          count: prevCount + action.count,
        },
      };
      return {
        ...state,
        items: newItems,
        totalItems: getTotalItems(newItems),
        totalAmount: getTotalAmount(newItems),
      };
    case "REMOVE":
      if (action.id in state.items) {
        let newItems;
        if (state.items[action.id].count === 1) {
          newItems = Object.keys(state.items).reduce((acc, curr) => {
            if (action.id !== curr) acc[curr] = { ...state.items[curr] };
            return acc;
          }, {});
        } else {
          newItems = {
            ...state.items,
            [action.id]: {
              ...state.items[action.id],
              count: state.items[action.id].count - 1,
            },
          };
        }
        return {
          ...state,
          items: newItems,
          totalItems: getTotalItems(newItems),
          totalAmount: getTotalAmount(newItems),
        };
      }
      console.log(`Unable to remove item with id: ${action.id}`);
      return state;
    default:
      console.log("Should not get here!");
      return state;
  }
};

const initState = {
  showCart: false,
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

const CartContextProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, initState);

  const openHandler = (e) => {
    dispatchCart({ type: "OPEN" });
  };

  const closeHandler = (e) => {
    dispatchCart({ type: "CLOSE" });
  };

  const addItem = (item) => {
    dispatchCart({ type: "ADD", ...item });
  };

  const removeItem = (id) => {
    dispatchCart({ type: "REMOVE", id });
  };

  const cartContextValue = {
    showCart: cart.showCart,
    openHandler,
    closeHandler,
    items: cart.items,
    totalItems: cart.totalItems,
    totalAmount: cart.totalAmount,
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
