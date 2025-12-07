import React, { useContext } from "react";
import { CashierCartContext } from "../../contexts/CashierCartContext"
import "../../../css/cashier.css";

function CashierOrderListItems() {
    const { cart, addToCart, clearCart } = useContext(CashierCartContext);
    const { removeFromCart } = useContext(CashierCartContext);
    console.log(cart);

    const tempCart = [...cart];
    const outputCart = [];

    for(let i = 0; i < cart.length; i++) {
        for (let j = 0; j < cart[i].quantity; j++) {
            const copy = { ...tempCart[i] };
            copy.quantity = 1;
            outputCart.push(tempCart[i]);
        }
    }

    
    async function add() {
        addToCart(title, price);
    }

    async function remove(){
        removeFromCart(order);
    }

    return (
        <div class="order-preview-items">
            {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
        ) : (
            outputCart.map((item, index) => (
            <div className="order-details-row" key={index}>
                <span className="order-details-name">
                    {item.name}
                    {item.side.length > 0 && item.side.map((side, sideIndex) => (
                         <div key={sideIndex} className="side-detail-text">w/ {side}</div>
                    ))}
                </span>
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