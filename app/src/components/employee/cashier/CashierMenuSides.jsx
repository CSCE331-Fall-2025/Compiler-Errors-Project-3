import React, {useContext} from "react";
import { CartContext } from "../../contexts/CartContext";

function CashierMenuSides({order, item}) {
    
    const { cart, clearCart, addSide } = useContext(CartContext);
    async function chooseSide() {
        addSide(order, item);
        console.log(cart);
    }

    return (
        <button onClick={chooseSide} class="checkout-order-side">
            {item}
        </button>
    );
}

export default CashierMenuSides;