import React, { useContext, useEffect, useState } from 'react';
import { CashierCartContext } from "../../contexts/CashierCartContext";
import CashierOrderListItems from './CashierOrderListItems';
import { useNavigate } from 'react-router-dom';
import "../../../css/cashier.css";
import { submitOrders } from "../../../js/utils";

/**
 * Displays the cashier's current order list, subtotal, and allows placing the order.
 *
 * @component
 * @example
 * return <CashierOrderList />;
 */
function CashierOrderList() {
    const { cart, clearCart } = useContext(CashierCartContext);
    const [subtotal, setSubtotal] = useState(0.0);
    const navigate = useNavigate();

    // Update subtotal whenever cart changes
    useEffect(() => {
        console.log("Trying");
        const total = cart.length > 0 
            ? cart.reduce((acc, c) => acc + parseFloat(c.price.replace("$", "")), 0) 
            : 0.0;
        setSubtotal(total.toFixed(2));
    }, [cart]);

    /**
     * Consolidates cart items and sends them to the server, then clears the cart on success.
     */
    async function placeOrder() {
        const newCart = [];
        const names = [...new Set(cart.map(c => c.name))]; // unique names

        names.forEach(name => {
            let qty = 0;
            const add = [];
            const sub = [];

            cart.forEach(item => {
                if (item.name === name) {
                    qty += 1;
                    if (item.side) add.push(item.side);
                    if (item.sub?.length) sub.push(...item.sub);
                }
            });

            newCart.push({ name, quantity: qty, add, sub });
        });

        const response = await fetch(
            'http://localhost:3000/api/Cashier/addOrders', 
            submitOrders(newCart)
        );

        if (response.status === 200) {
            clearCart();
        }
    }

    return (
        <aside className="cashier-order-list">
            <h1>Order Details</h1>

            <div id="cashierOrderItems" className="cashierOrderItems">
                <div className="summary-row">
                    <span>Items</span>
                    <CashierOrderListItems />
                </div>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
            </div>

            <button onClick={placeOrder} id="placeOrder" className="checkout-btn">
                Place Order
            </button>
        </aside>
    );
}

export default CashierOrderList;
