import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}