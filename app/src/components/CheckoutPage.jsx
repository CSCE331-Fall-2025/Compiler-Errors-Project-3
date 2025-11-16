import React from 'react';
import NavBar from "./NavBar"
import Hero from "./Hero"
import "../css/checkout.css"
import CheckoutSummary from './CheckoutSummary';
import OrderPanel from "./CheckoutOrderPanel";

function CheckoutPage() {
    return (
        <>
            <NavBar></NavBar>
            <div class="vspacer"></div>
            <main class = "checkout-main">
                <OrderPanel></OrderPanel>
                <CheckoutSummary></CheckoutSummary>
            </main>
        </>
    );
}

export default CheckoutPage;