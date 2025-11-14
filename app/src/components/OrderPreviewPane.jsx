import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css"
import OrderPreview from "./OrderPreview";

function OrderPreviewPane() {
    const navigate = useNavigate();
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