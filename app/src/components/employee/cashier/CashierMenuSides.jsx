import React, {useContext} from "react";
import { CashierCartContext } from "../../contexts/CashierCartContext";

function CashierMenuSides({order, item}) {
    
    const { cart, clearCart, addSide } = useContext(CashierCartContext);
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