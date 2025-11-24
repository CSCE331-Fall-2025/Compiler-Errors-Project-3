import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../../../css/style.css";
import { Link } from "react-router-dom";

function OrderMenuitem({ img, alt, title, cal, price }) {

    const { cart, addToCart, clearCart } = useContext(CartContext);

    async function add() {
        addToCart(title, price);
    }

    return (
        <div class="menu-item">
            <div class="menu-item-img-container">
                <img src={`data:image/png;base64,${img}`} alt={alt} class="menu-item-img"></img>
            </div>

            <div class="menu-text">
                <span class="item-title">{title}</span>
                <div class="menu-info">
                    <span class="calories">{cal}</span>
                    <span class="price">{price}</span>
                </div>
            </div>
            
            <div class="menu-item-button-container">
                <button type="button" onClick={add} class="menu-item-button">Add to cart</button>
            </div>
        </div>
    );
}

export default OrderMenuitem;