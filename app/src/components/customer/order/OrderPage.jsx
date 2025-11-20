import React from "react";
import NavBar from "../../NavBar"
import OrderMenu from "./OrderMenu"
import OrderPreviewPane from "./OrderPreviewPane";
import "../../../css/style.css"

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