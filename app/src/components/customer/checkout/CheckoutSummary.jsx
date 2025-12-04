import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from "../../contexts/CartContext";
import "../../../css/checkout.css";
import { submitOrders } from '../../../js/utils';
import { useNavigate } from 'react-router-dom';

function CheckoutSummary(){
    const { cart, clearCart } = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0.0);
    const navigate = useNavigate();

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
            const sub = [];
            var qty = 0;

            for(let j = 0; j < cart.length; j++) {
                if(cart[j].name === names[i]) {
                    qty += 1;
                    if(cart[j].side != null) {
                        add.push(cart[j].side);
                    }

                    for(let k = 0; k < cart[j].sub.length; k++) {
                        sub.push(cart[j].sub[k]);
                    }
                }
            }

            const order = {
                name: names[i],
                quantity: qty,
                add: add,
                sub: sub
            }

            newCart.push(order);

        }

        console.log(newCart);

        const response = await fetch('http://localhost:3000/api/Cashier/addOrders', submitOrders(newCart));
        
        if(response.status == 200) {
            clearCart();
            navigate("/");   
        }
    }

    return(
        
        <aside class = "summary-card">
            <button class="back-btn"onClick={() => navigate(-1)}
                > Back
            </button>
            <h2>Order Summary</h2>
                            <p>Items</p>

            <div class = "summary-row">
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
            <button onClick={placeOrder} id = "placeOrder" class = "checkout-btn">Place Order</button>
        </aside>
    );
}

export default CheckoutSummary;