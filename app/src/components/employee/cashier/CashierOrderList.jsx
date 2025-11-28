import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "../components/contexts/CartContext";
import CashierOrderListItems from './CashierOrderListItems';
import "../../../css/cashier.css";

function CashierOrderList(){
    const { cart, clearCart } = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0.0);

    useEffect(() => {
        if(cart.length > 0){
            setSubtotal(cart.reduce((acc, c) => acc + parseFloat(c.price.replace("$", "")), 0).toFixed(2));
        } else {
            setSubtotal(0.0);
        }
    });

    async function placeOrder() {
        
        const newCart = [];
        const names = [];
        for(let i = 0; i < cart.length; i++) {
            if(!names.includes(cart[i].name)) {
                names.push(cart[i].name);
            }
        }

        for(let i = 0; i < names.length; i++) {
            const add = [];
            const qty = 0;

            for(let j = 0; j < cart.length; j++) {
                if(cart[j].name === names[i]) {
                    qty += 1;
                    if(cart[j].side != null) {
                        add.push(cart[j].side);
                    }
                }
            }

            const order = {
                name: names[i],
                quantity: qty,
                add: add,
                sub: []
            }

            newCart.push(order);


        }
        const response = await fetch('http://localhost:3000/api/Cashier/addOrders', submitOrders(newCart));
        const data = await response.json();

        if(response.status == 200) {
            clearCart();
            // navigate away   
        }

    }

    return(
        <aside className="cashier-order-list">
            <h1>Order details</h1>
            <div id="cashierOrderItems" className="cashierOrderItems">
                {/* items will be added here or served by server side */}
                <div className="summary-row">
                    <span>Items</span>
                    <CashierOrderListItems/>
                </div>
                <button class="checkout-button">Submit order</button>
            </div>
            <button onClick={placeOrder} id="placeOrder" className="checkout-btn">
                Place Order
            </button>
        </aside>
    );
}
export default CashierOrderList;