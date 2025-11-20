import React, { useContext, useEffect, useState } from "react";
import CheckoutOrderSide from "./CheckoutOrderSide";
import { CartContext } from "../../contexts/CartContext";

function CheckoutOrderItem({order, title, price, hasSide=false}){

    const [data, setData] = useState([]);
    const { removeFromCart } = useContext(CartContext);

    useEffect(() => {
        async function getMenu() {
            const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
            const data = await response.json();
            setData(data);
        }
        getMenu();
    }, []);

    const newData = [];

    for(let i = 0; i < data.length; i++) {
        if(data[i].type === "Side") {
            newData.push(data[i]);
        }
    }

    return(
        <section class="checkout-order-item-container">
            <section class="checkout-order-item">
                <div class="checkout-order-img-container"></div>
                <div class="checkout-order-title">{title}</div>
                <div class="checkout-order-price">{price}</div>
                <button onClick={() => removeFromCart(order)} class="checkout-order-remove-button">X</button>
            </section>
            {hasSide && <section class="checkout-order-side-container">
                Sides
                {newData.map((item, idx) => (
                    <CheckoutOrderSide key={item.title+idx} order={order} item={item.title}/>
                ))}
            </section>} 
        </section>
    );
}

export default CheckoutOrderItem;