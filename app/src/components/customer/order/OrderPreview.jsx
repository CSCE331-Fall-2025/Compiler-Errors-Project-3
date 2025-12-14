import React from "react";
import "../../../css/style.css";
import OrderPreviewItems from "./OrderPreviewItems";

/**
 * Displays the customer's current order preview including the list of items.
 *
 * @component
 *
 * @example
 * return <OrderPreview />;
 */
function OrderPreview() {
    return (
        <div class="order-preview-details">
            <div class="order-preview-title">
                <h1> YOUR ORDER </h1>
            </div>
            <OrderPreviewItems></OrderPreviewItems>
        </div>
    );
}

export default OrderPreview;
