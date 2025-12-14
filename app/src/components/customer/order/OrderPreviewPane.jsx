import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/style.css";
import OrderPreview from "./OrderPreview";

/**
 * Pane displaying the customer's current order preview and a checkout button.
 *
 * @component
 *
 * @example
 * return <OrderPreviewPane />;
 */
function OrderPreviewPane() {
    const navigate = useNavigate();

    /**
     * Navigates to the checkout page when the user clicks the checkout button.
     */
    async function checkout() {
        navigate("/checkout");
    }

    return (
        <div class="order-preview-pane">
            <OrderPreview></OrderPreview>
            <div class="checkout-button-container">
                <button onClick={checkout} class="checkout-button">Checkout</button>
            </div>
        </div>
    );
}

export default OrderPreviewPane;
