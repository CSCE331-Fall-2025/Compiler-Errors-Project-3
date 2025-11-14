import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css"
import OrderPreviewItems from "./OrderPreviewItems";

function OrderPreview() {
    const navigate = useNavigate();
    async function checkout() {
        navigate("/checkout");
    }

    return (
        <div class="order-preview-details">
            <div class="order-preview-title">
                Your Order
            </div>
            <OrderPreviewItems></OrderPreviewItems>
        </div>
    );
}

export default OrderPreview;