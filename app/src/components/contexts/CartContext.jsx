import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

/**
 * CartProvider
 *
 * Provides global cart state and operations for:
 * - Adding items
 * - Removing items
 * - Clearing the cart
 * - Updating sides and substitutions
 * - Persisting cart in localStorage
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Wrapped components.
 * @returns {JSX.Element} The cart context provider.
 */
export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  /** Load saved cart on mount */
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  /** Persist cart to localStorage whenever it changes */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (name, price, type="Entree") => {
    let order = {
      name: name,
      price: price,
      quantity: 1,
      side: null,
      sub: [],
      type: type
    };

    setCart((prev) => [...prev, order]);
  };

  const addSide = (order, side) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        cart[i].side = side;
        break;
      }
    }
  };


  const addSub = (order, sub) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        if(cart[i].sub.includes(sub)) {
          cart[i].sub.splice(cart[i].sub.indexOf(sub), 1);
          break;
        }
        cart[i].sub.push(sub);
        break;
      }
    }
  };


  const clearCart = () => setCart([]);

  const removeFromCart = (order) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        const newCart = [...cart];
        newCart.splice(i, 1);
        setCart(newCart);
        return;
      }
    }
  };

  const replaceCart = (cart) => {
    setCart(cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        replaceCart,
        addSide,
        addSub
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
