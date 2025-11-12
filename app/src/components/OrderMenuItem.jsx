import React from "react";
import "../css/style.css";
import { Link } from "react-router-dom";

function OrderMenuitem({ img, alt, title, cal, price }) {
    return (
        <div class="menu-item">
            <div class="menu-item-img-container">
                <img src={img} alt={alt} class="menu-item-img"></img>
            </div>

            <div class="menu-text">
                <span class="item-title">{title}</span>
                <div class="menu-info">
                    <span class="calories">{cal}</span>
                    <span class="price">{price}</span>
                </div>
            </div>
            
            <div class="menu-item-button-container">
                <Link to="/checkout">Add to cart</Link>
            </div>
        </div>
    );
}

export default OrderMenuitem;