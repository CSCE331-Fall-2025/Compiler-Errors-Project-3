import React, { createContext, useState, useEffect } from "react";

export const CashierCartContext = createContext();

export function CashierCartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (name, price, type="Entree") => {
    // for(let i = 0; i < cart.length; i++) {
    //   if(cart[i].name === name) {
    //     const newCart = [...cart];
    //     newCart[i].quantity += 1;
    //     setCart(newCart);
    //     return;
    //   }
    // }

    let order = {
      name: name,
      price: price,
      quantity: 1,
      side: null,
      type: type
    }

    setCart((prev) => [...prev, order]);
  }

  const addSide = (order, side) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        cart[i].side = side;
      }
    }
  }

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
  }

  const replaceCart = (cart) => {
    setCart(cart);
  }

  return (
    <CashierCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, replaceCart, addSide }}>
      {children}
    </CashierCartContext.Provider>
  );
}