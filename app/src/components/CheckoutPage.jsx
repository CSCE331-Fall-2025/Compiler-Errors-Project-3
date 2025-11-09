import React from 'react';
import NavBar from "./NavBar"
import Hero from "./Hero"
import "../css/checkout.css"

function CheckoutPage() {
    return (
        <>
            <NavBar></NavBar>
            <main class = "checkout-main">
                <section class = "order-panel">
                    <h1>Your order</h1>
                    <div id = "orderItems" class = "orderItems">
                        {/* items will be added here or served by server side */}
                        <div class = "empty">Your cart is empty</div>
                    </div>
                </section>

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
            </main>
        </>
    );
}

export default CheckoutPage;