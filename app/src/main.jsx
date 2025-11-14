import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CartProvider>
        <App/>
    </CartProvider>
);