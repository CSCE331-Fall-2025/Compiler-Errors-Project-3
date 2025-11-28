import React from "react";
import "../../../css/cashier.css";
import { Link } from "react-router-dom";

function CashierMenuItem({ img, alt, title, cal, price }) {
    const { cart, addToCart, clearCart } = useContext(CartContext);
    
    async function add() {
        addToCart(title, price);
    }

    return (
        <div class="cashier-menu-item">
            <div class="cashier-menu-item-img-container">
                <img src={img} alt={alt} class="menu-item-img"></img>
            </div>

            <div class="cashier-menu-text">
                <span class="cashier-item-title">{title}</span>
                <div class="cashier-menu-info">
                    <span class="cashier-price">{price}</span>
                </div>
            </div>
            
            <div class="menu-item-button-container">
                <button type="button" onClick={add} class="menu-item-button">Add to cart</button>
            </div>
        </div>
    );
}

export default CashierMenuItem;