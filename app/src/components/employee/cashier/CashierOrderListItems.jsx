import React, { useContext } from "react";
import { CashierCartContext } from "../../contexts/CashierCartContext";
import "../../../css/cashier.css";

/**
 * Renders the list of items in the cashier's cart with their quantities and remove buttons.
 *
 * @component
 */
function CashierOrderListItems() {
    const { cart, removeFromCart } = useContext(CashierCartContext);

    // Flatten cart items according to their quantity
    const outputCart = cart.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({ ...item, quantity: 1 }))
    );

    return (
        <div className="order-preview-items">
            {cart.length === 0 ? (
                <div className="empty-cart">Your cart is empty.</div>
            ) : (
                outputCart.map((item, index) => (
                    <div className="order-details-row" key={index}>
                        <span className="order-details-name">{item.name}</span>
                        <span className="order-details-qty">{item.price}</span>
                        <button
                            onClick={() => removeFromCart(item)}
                            className="checkout-order-remove-button"
                        >
                            X
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CashierOrderListItems;
