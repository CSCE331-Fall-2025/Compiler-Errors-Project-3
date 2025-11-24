import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "../../contexts/CartContext";
import "../../../css/checkout.css";
import { submitOrders } from '../../../js/utils';

function CheckoutSummary(){
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
        <aside class = "summary-card">
            <h2>Order Summary</h2>
            <div class = "summary-row">
                <p>Items</p>
                {cart.map((item) => (
                    <div class="checkout-summary-items">
                        <span class="checkout-summary-item-name">{item.name}</span>
                        <span class="checkout-summary-item-price">{item.price}</span>
                    </div>
                ))}
            </div>
            <div class = "summary-row">
                <div class="checkout-summary-text-fitter">
                    <span class="checkout-summary-descriptor">Subtotal</span>
                    <span class="checkout-summary-prices" id = "summary-sub">{"$"+subtotal}</span>
                </div>
            </div>
            <div class = "summary-row">
                <div class="checkout-summary-text-fitter">
                    <span class="checkout-summary-descriptor">Sales Tax</span>
                    <span class="checkout-summary-prices" id = "summary-tax">{"$" + (0.0825 * subtotal).toFixed(2)}</span>
                </div>
            </div>
            <hr />
            <div class = "summary-total">
                <span>Total</span>
                <strong id = "summary-total">{"$" + (subtotal*1.0825).toFixed(2)}</strong>
            </div>
            <button onClick={clearCart} id = "placeOrder" class = "checkout-btn">Place Order</button>
        </aside>
    );
}

export default CheckoutSummary;