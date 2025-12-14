import React, { createContext, useState, useEffect } from "react";

export const CashierCartContext = createContext();

/**
 * CashierCartProvider
 *
 * Provides cart state and management functions for cashier-facing screens.
 * Mirrors CartProvider but excludes customer-only features such as substitutions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Wrapped components.
 * @returns {JSX.Element} The cashier cart context provider.
 */
export function CashierCartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /** Load saved cart from localStorage on mount */
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
      type: type
    };

    setCart((prev) => [...prev, order]);
  };

  const addSide = (order, side) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        cart[i].side = side;
      }
    }
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (order) => {
    console.log(order, cart);
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].name === order.name) {
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
    <CashierCartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        replaceCart,
        addSide
      }}
    >
      {children}
    </CashierCartContext.Provider>
  );
}
