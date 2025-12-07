import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import CashierMenuSides from "../cashier/CashierMenuSides";
import "../../../css/cashier.css";

function CashierMenuItem({ img, alt, title, cal, price, order, hasSide = true }) {
    const { addToCart } = useContext(CartContext);
    const [data, setData] = useState([]);
    const { removeFromCart } = useContext(CartContext);

    function add() {
        addToCart(title, price);
    }

    function addSide() {
        console.log("side added");
        addToCart(title, price);
    }

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

    return (
        <div className="cashier-menu-item">
            <div className="cashier-menu-text">
                <span className="cashier-item-title">{title}</span>
                <div className="cashier-menu-info">
                    <span className="cashier-price">{price}</span>
                </div>
            </div>

            {hasSide && <section className="checkout-order-side-containerr">
                Sides
                {newData.map((item, idx) => (
                    <CashierMenuSides key={item.title+idx} order={order} item={item.title}/>
                    // <button type = "button" onClick={addSide} className ="checkout-order-side">
                    //     {item.title}
                    // </button>
                ))}
            </section>}

            <div className="menu-item-button-containerr">
                <button type="button" onClick={add} className="menu-item-buttonn">
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default CashierMenuItem;
