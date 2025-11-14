import React from 'react';
import NavBar from "./NavBar";
import "../css/checkout.css";

function CheckoutSummary(){
    return(
        <aside class = "summary-card">
            <h2>Order Summary</h2>
            <div class = "summary-row">
                <span>Items</span>
                <span id = "summary-count">0</span>
            </div>
            <div class = "summary-row">
                <span>Subtotal</span>
                <span id = "summary-sub">$0.00</span>
            </div>
            <div class = "summary-row">
                <span>Sales Tax</span>
                <span id = "summary-tax">$0.00</span>
            </div>
            <hr />
            <div class = "summary-total">
                <span>Total</span>
                <strong id = "summary-total">$0.00</strong>
            </div>
            <button id = "placeOrder" class = "checkout-btn">Place Order</button>
        </aside>
    );
}

export default CheckoutSummary;