import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../../../css/style.css";
import { Link } from "react-router-dom";

/**
 * Displays a single menu item with its image, title, calories, price, and an "Add to cart" button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.img - Base64-encoded image for the menu item.
 * @param {string} props.alt - Alt text for the image.
 * @param {string} props.title - Name of the menu item.
 * @param {string} props.cal - Calorie information.
 * @param {string} props.price - Price of the menu item.
 * @param {string} [props.type="Entree"] - Type of the item (e.g., Entree, Side).
 *
 * @example
 * return <OrderMenuitem 
 *   img={imgData} 
 *   alt="Orange Chicken" 
 *   title="Orange Chicken" 
 *   cal="500 cal" 
 *   price="$8.99" 
 *   type="Entree" 
 * />;
 */
function OrderMenuitem({ img, alt, title, cal, price, type }) {
    const { cart, addToCart, clearCart } = useContext(CartContext);

    /**
     * Adds the current menu item to the cart.
     */
    async function add() {
        addToCart(title, price, type);
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
