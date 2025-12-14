import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../../../css/style.css";

/**
 * Displays individual items in the customer's order preview.
 * Allows removal of items from the cart.
 *
 * @component
 *
 * @example
 * return <OrderPreviewItems />;
 */
function OrderPreviewItems() {
    let { cart } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);

    const tempCart = [...cart];
    const outputCart = [];

    for (let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].quantity; j++) {
            const copy = { ...tempCart[i] };
            copy.quantity = 1;
            outputCart.push(tempCart[i]);
        }
    }

    return (
        <div class="order-preview-items">
            {cart.length === 0 ? (
                <div class="empty-cart">Your cart is empty.</div>
            ) : (
                outputCart.map((item, index) => (
                    <div class="order-details-row" key={index}>
                        <span class="order-details-name">{item.name}</span>
                        <span class="order-details-qty">{item.price}</span>
                        <button
                            onClick={() => removeFromCart(item)}
                            class="checkout-order-remove-button"
                        >
                            X
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderPreviewItems;
