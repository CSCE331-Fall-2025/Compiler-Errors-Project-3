import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import CheckoutOrderItem from "./CheckoutOrderItem";

/**
 * Displays the list of items currently in the user's cart during checkout.
 * Wraps individual items with <CheckoutOrderItem />.
 *
 * @returns {JSX.Element} The order panel component.
 */
function OrderPanel(){
    const { cart } = useContext(CartContext);

    console.log(cart);

    return(
        <section class = "order-panel">
            <h1>Your order</h1>
            <div id = "orderItems" class = "orderItems">
                {cart.map((item, idx) => (
                    <CheckoutOrderItem
                        key={item.name+idx}
                        order={item}
                        title={item.name}
                        price={item.price}
                        hasSide={item.type === "Entree"}
                    />
                ))}
            </div>
        </section>
    );
}

export default OrderPanel;
