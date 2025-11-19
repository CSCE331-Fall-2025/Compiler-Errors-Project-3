import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "./CartContext";
import "../css/checkout.css";

function CheckoutSummary(){
    const { cart, clearCart } = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0.0);

    useEffect(() => {
        if(cart.length > 0){
            setSubtotal(cart.reduce((acc, c) => acc + parseFloat(c.price.replace("$", "")), 0).toFixed(2));
        } else {
            setSubtotal(0.0);
        }
    });


    async function placeOrder() {
        
        // const newCart = [];
        // for(let i = 0; i < cart.length; i++) {
        //     const order = {

        //     }
        // }

        // fetch (endpoint)
        // if success:
        //  clear cart
        // else:
        //  dont
    }

    return(
        <aside class = "summary-card">
            <h2>Order Summary</h2>
            <div class = "summary-row">
                <p>Items</p>
                {cart.map((item) => (
                    <div class="checkout-summary-items">
                        <span class="checkout-summary-item-name">{item.name}</span>
                        <span class="checkout-summary-item-price">{item.price}</span>
                    </div>
                ))}
            </div>
            <div class = "summary-row">
                <div class="checkout-summary-text-fitter">
                    <span class="checkout-summary-descriptor">Subtotal</span>
                    <span class="checkout-summary-prices" id = "summary-sub">{"$"+subtotal}</span>
                </div>
            </div>
            <div class = "summary-row">
                <div class="checkout-summary-text-fitter">
                    <span class="checkout-summary-descriptor">Sales Tax</span>
                    <span class="checkout-summary-prices" id = "summary-tax">{"$" + (0.0825 * subtotal).toFixed(2)}</span>
                </div>
            </div>
            <hr />
            <div class = "summary-total">
                <span>Total</span>
                <strong id = "summary-total">{"$" + (subtotal*1.0825).toFixed(2)}</strong>
            </div>
            <button onClick={clearCart} id = "placeOrder" class = "checkout-btn">Place Order</button>
        </aside>
    );
}

export default CheckoutSummary;