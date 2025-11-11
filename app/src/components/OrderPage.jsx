import React from "react";
import NavBar from "./NavBar"
import OrderMenu from "./OrderMenu"
import "../css/style.css"

function OrderPage() {
    return (
        <>
            <NavBar></NavBar>
            <div class="vspacer"></div>
            <OrderMenu></OrderMenu>

        </>
    );
}

export default OrderPage;