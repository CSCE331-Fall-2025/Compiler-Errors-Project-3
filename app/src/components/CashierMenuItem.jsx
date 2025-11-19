import React from "react";
import "../css/cashier.css";
import { Link } from "react-router-dom";

function CashierMenuItem({ img, alt, title, cal, price }) {
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
            
            <div class="cashier-menu-item-button-container">
                <Link to="/checkout">Add to cart</Link>
            </div>
        </div>
    );
}

export default CashierMenuItem;