import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CheckoutOrderItem from "./CheckoutOrderItem"

function OrderPanel(){
    const { cart } = useContext(CartContext);

    return(
        <section class = "order-panel">
            <h1>Your order</h1>
            <div id = "orderItems" class = "orderItems">
                {cart.map((item, idx) => (
                    <CheckoutOrderItem key={item.name+idx} order={item} title={item.name} price={item.price} hasSide={true}/>
                ))}
            </div>
        </section>
    );
}

export default OrderPanel;