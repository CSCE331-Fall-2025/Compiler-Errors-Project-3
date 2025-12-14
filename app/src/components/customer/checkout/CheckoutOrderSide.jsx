import React, {useContext} from "react";
import { CartContext } from "../../contexts/CartContext";

/**
 * Button component for selecting a side or substitution during checkout.
 *
 * @param {Object} props
 * @param {Object} props.order - The order item the modification applies to.
 * @param {string} props.item - The side or substitution label.
 * @param {"add" | "sub"} [props.type="add"] - Determines whether this button adds a side or a subtraction.
 * @returns {JSX.Element} A button used to modify an order item.
 */
function CheckoutOrderSide({order, item, type="add"}) {
    
    const { cart, clearCart, addSide, addSub } = useContext(CartContext);

    /**
     * Applies a side or substitution to the given order item.
     * Called when the user presses the button.
     */
    async function chooseSide() {
        if(type === "add") {
            addSide(order, item);
        } else {
            addSub(order, item.slice(3));
        }
    }

    return (
        <button onClick={chooseSide} class="checkout-order-side">
            {item}
        </button>
    );
}

export default CheckoutOrderSide;
