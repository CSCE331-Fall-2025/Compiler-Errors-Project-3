import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

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
    }

    setCart((prev) => [...prev, order]);
  }

  const addSide = (order, side) => {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i] == order) {
        cart[i].side = side;
        break;
      }
    }
  }

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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, replaceCart, addSide, addSub }}>
      {children}
    </CartContext.Provider>
  );
}