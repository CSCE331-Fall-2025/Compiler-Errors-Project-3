import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

/**
 * Button component for adding a side item to a specific order in the cashier cart.
 *
 * @param {Object} props
 * @param {Object} props.order - The order object to which the side should be added.
 * @param {string} props.item - The name of the side item.
 *
 * @component
 *
 * @example
 * return <CashierMenuSides order={order} item="Fried Rice" />;
 */
function CashierMenuSides({ order, item }) {
    const { cart, addSide } = useContext(CartContext);

    /**
     * Adds the side item to the order and logs the current cart state.
     */
    async function chooseSide() {
        addSide(order, item);
        console.log(cart);
    }

    return (
        <button onClick={chooseSide} className="checkout-order-side">
            {item}
        </button>
    );
}

export default CashierMenuSides;
