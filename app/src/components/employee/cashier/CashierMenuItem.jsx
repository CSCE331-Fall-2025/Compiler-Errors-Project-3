import React, { useContext, useEffect, useState } from "react";
import { CashierCartContext } from "../../contexts/CashierCartContext";
import CashierMenuSides from "../cashier/CashierMenuSides";
import "../../../css/cashier.css";

/**
 * CashierMenuItem component displays a menu item in the cashier view.
 * It shows the item details, price, and optionally allows selecting sides.
 * 
 * @param {Object} props
 * @param {string} props.img - Base64 or URL of the menu item image.
 * @param {string} props.alt - Alt text for the image.
 * @param {string} props.title - Name of the menu item.
 * @param {number|string} props.cal - Calories of the item (optional).
 * @param {number|string} props.price - Price of the menu item.
 * @param {Object} props.order - Current order object for adding sides.
 * @param {boolean} [props.hasSide=true] - Determines if sides should be displayed.
 * 
 * @component
 *
 * @example
 * return <CashierMenuItem title="Orange Chicken" price={8.99} order={order} />;
 */
function CashierMenuItem({ img, alt, title, cal, price, order, hasSide = true }) {
    const { addToCart, removeFromCart } = useContext(CashierCartContext);
    const [data, setData] = useState([]);

    /**
     * Adds the main item to the cart.
     */
    function add() {
        addToCart(title, price);
    }

    /**
     * Adds a side item to the cart. Currently logs to console.
     */
    function addSide() {
        console.log("side added");
        addToCart(title, price);
    }

    // Fetch menu data on component mount
    useEffect(() => {
        async function getMenu() {
            const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchMenu');
            const data = await response.json();
            setData(data);
        }
        getMenu();
    }, []);

    // Filter sides from menu data
    const newData = data.filter(item => item.type === "Side");

    return (
        <div className="cashier-menu-item">
            <div className="cashier-menu-text">
                <span className="cashier-item-title">{title}</span>
                <div className="cashier-menu-info">
                    <span className="cashier-price">{price}</span>
                </div>
            </div>

            {hasSide && (
                <section className="checkout-order-side-container">
                    Sides
                    {newData.map((item, idx) => (
                        <CashierMenuSides key={item.title + idx} order={order} item={item.title} />
                    ))}
                </section>
            )}

            <div className="menu-item-button-container">
                <button type="button" onClick={add} className="menu-item-button">
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default CashierMenuItem;
