import React from "react";
import NavBar from "./NavBar"
import OrderMenu from "./OrderMenu"
import "../css/style.css"

function OrderPage() {
    return (
        <>
            <NavBar></NavBar>
            <h1 class="title">
                MENU
                <h2 class="subtitle">Select your item(s)</h2>
            </h1>
            <OrderMenu></OrderMenu>

        </>
    );
}

export default OrderPage;