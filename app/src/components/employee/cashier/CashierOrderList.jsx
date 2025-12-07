import React, { useContext, useEffect, useState } from 'react';
import { CashierCartContext } from "../../contexts/CashierCartContext";
import CashierOrderListItems from './CashierOrderListItems';
import { useNavigate } from 'react-router-dom';
import "../../../css/cashier.css";
import { submitOrders } from "../../../js/utils";

function CashierOrderList(){
    const { cart, clearCart } = useContext(CashierCartContext);
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

        for (let i = 0; i < cart.length; i++) {
            if (!names.includes(cart[i].name)) {
                names.push(cart[i].name);
            }
        }

        for (let i = 0; i < names.length; i++) {
            const add = [];
            const sub = [];
            let qty = 0;

            for (let j = 0; j < cart.length; j++) {
                if (cart[j].name === names[i]) {
                    qty += 1;

                    const itemSide = Array.isArray(cart[j].side) ? cart[j].side : [];
                    if (itemSide.length > 0) add.push(...itemSide);

                    const itemSub = Array.isArray(cart[j].sub) ? cart[j].sub : [];
                    if (itemSub.length > 0) sub.push(...itemSub);
                }
            }

            const order = {
                name: names[i],
                quantity: qty,
                add,
                sub
            };

            newCart.push(order);
        }

        console.log(newCart);

        const response = await fetch(
            "http://localhost:3000/api/Cashier/addOrders",
            submitOrders(newCart)
        );

        if (response.status === 200) {
            clearCart();
            navigate("/");
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
            </div>
            <button onClick={placeOrder} id="placeOrder" className="checkout-btn">
                Place Order
            </button>
        </aside>
    );
}
export default CashierOrderList;