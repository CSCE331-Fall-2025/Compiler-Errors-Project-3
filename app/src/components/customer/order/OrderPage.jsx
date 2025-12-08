import React from "react";
import NavBar from "../../NavBar";
import OrderMenu from "./OrderMenu";
import OrderPreviewPane from "./OrderPreviewPane";
import "../../../css/style.css";

/**
 * Displays the customer order page with the menu and order preview pane.
 *
 * @component
 *
 * @example
 * return <OrderPage />;
 */
function OrderPage() {
    return (
        <>
            <NavBar></NavBar>
            <div class="vspacer"></div>

            <div class="order-page-container">
                <OrderMenu></OrderMenu>
                <OrderPreviewPane></OrderPreviewPane>
            </div>
        </>
    );
}

export default OrderPage;
