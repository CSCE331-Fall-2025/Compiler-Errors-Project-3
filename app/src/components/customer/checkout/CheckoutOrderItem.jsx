import React, { useContext, useEffect, useState } from "react";
import CheckoutOrderSide from "./CheckoutOrderSide";
import { CartContext } from "../../contexts/CartContext";
import { fetchIngredients } from "../../../js/utils";

function CheckoutOrderItem({order, title, price, hasSide=false}){

    const [data, setData] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const { removeFromCart } = useContext(CartContext);

    useEffect(() => {
        async function getData() {
            const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
            const data = await response.json();
            setData(data);

            await fetch('http://localhost:3000/api/OrderMenu/fetchIngredients', fetchIngredients(title))
            .then(res => res.json())
            .then(data => {
                setIngredients(data.result);
            });
        }
        getData();
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
                <div class="checkout-order-img-container">

                </div>
                <div class="checkout-order-title">{title}</div>
                <div class="checkout-order-price">{price}</div>
                <button onClick={() => removeFromCart(order)} class="checkout-order-remove-button">X</button>
            </section>
            {hasSide && <section class="checkout-order-side-container">
                Sides
                {newData.map((item, idx) => (
                    <CheckoutOrderSide key={item.title+idx} order={order} item={item.title}/>
                ))}
                {ingredients.map((item, idx) => (
                    <CheckoutOrderSide key={item+idx} order={order} item={"No " + item} type="sub"/>
                ))}
            </section>} 
        </section>
    );
}

export default CheckoutOrderItem;