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

  const addToCart = (name) => {
    for(let i = 0; i < cart.length; i++) {
            if(cart[i].name === name) {
                const newCart = [...cart];
                newCart[i].quantity += 1;
                setCart(newCart);
                return;
        }
    }

    let order = {
            name: name,
            quantity: 1,
            add: [],
            sub: []
        }

    setCart((prev) => [...prev, order]);
  }

  const clearCart = () => setCart([]);

  const removeFromCart = (name) => {
    for(let i = 0; i < cart.length; i++) {
            if(cart[i].name === name) {
                const newCart = [...cart];
                newCart[i].quantity -= 1;
                
                if(newCart[i].quantity <= 0) {
                    newCart.splice(i, 1);
                }
                
                setCart(newCart);
                return;
        }
    } 
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}