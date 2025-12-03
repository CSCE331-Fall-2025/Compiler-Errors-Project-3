import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./components/contexts/CartContext.jsx";
import { CashierCartProvider } from "./components/contexts/CashierCartContext.jsx";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CashierCartProvider>
    <CartProvider>
        <App/>
    </CartProvider>
    </CashierCartProvider>
);