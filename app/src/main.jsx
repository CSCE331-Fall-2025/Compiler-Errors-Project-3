import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./components/contexts/CartContext.jsx";
import { CashierCartProvider } from "./components/contexts/CashierCartContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <GoogleOAuthProvider clientId="637691786190-2peleg0k9vjirtmfd69f5u8sdg4qpobo.apps.googleusercontent.com">
            <CashierCartProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
            </CashierCartProvider>
        </GoogleOAuthProvider>
    </AuthProvider>
);