import React, {useContext} from "react";
import { CartContext } from "../../contexts/CartContext";

function CheckoutOrderSide({order, item, type="add"}) {
    
    const { cart, clearCart, addSide, addSub } = useContext(CartContext);
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

export default CheckoutOrderSide