import React from 'react';
import NavBar from "../../NavBar"
import "../../../css/checkout.css"
import CheckoutSummary from './CheckoutSummary';
import OrderPanel from "./CheckoutOrderPanel";

/**
 * Renders the full checkout page layout, including the navigation bar,
 * order panel, and order summary.
 * @returns {JSX.Element} The checkout page component.
 */
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
