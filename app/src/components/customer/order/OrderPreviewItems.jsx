import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../../../css/style.css";


function OrderPreviewItems() {
    let { cart } = useContext(CartContext);
    console.log(cart);

    const tempCart = [...cart];
    const outputCart = [];

    for(let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].quantity; j++) {
            const copy = { ...tempCart[i] };
            copy.quantity = 1;
            outputCart.push(tempCart[i]);
        }
    }

    return (
        <div class="order-preview-items">
            {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
        ) : (
            outputCart.map((item, index) => (
            <div className="order-details-row" key={index}>
                <span className="order-details-name">{item.name}</span>
                <span className="order-details-qty"> {item.price}</span>
            </div>
            ))
        )}
        </div>
    );
}

export default OrderPreviewItems;