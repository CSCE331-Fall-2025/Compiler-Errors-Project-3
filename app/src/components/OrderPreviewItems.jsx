import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "../css/style.css"


function OrderPreviewItems() {
    let { cart } = useContext(CartContext);
    let s = "";
    if(cart.length == 0) {
        s = "Your cart is empty.";
    } else {
        s = "";
    }

    for(let i = 0; i < cart.length; i++) {
        s += `${cart[i].name.padEnd(30)}x${cart[i].quantity}` + "\n"
    }

    return (
        <div class="order-preview-items">
            {cart.length === 0 ? (
            <div className="empty-cart">Cart is empty</div>
        ) : (
            cart.map((item, index) => (
            <div className="order-details-row" key={index}>
                <span className="order-details-name">{item.name}</span>
                <span className="order-details-qty"> x{item.quantity}</span>
            </div>
            ))
        )}
        </div>
    );
}

export default OrderPreviewItems;