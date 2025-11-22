import React from "react";
import "../../../css/style.css";
import OrderPreviewItems from "./OrderPreviewItems";

function OrderPreview() {
    return (
        <div class="order-preview-details">
            <div class="order-preview-title">
             <h1>Your Order</h1>
            </div>
            <OrderPreviewItems></OrderPreviewItems>
        </div>
    );
}

export default OrderPreview;