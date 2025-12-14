import React, { useContext, useEffect, useState } from "react";
import CheckoutOrderSide from "./CheckoutOrderSide";
import { CartContext } from "../../contexts/CartContext";
import { fetchIngredients } from "../../../js/utils";

/**
 * CheckoutOrderItem
 *
 * Displays a single item inside the checkout panel, including:
 * - Item name and price
 * - Remove button
 * - Optional side selection (if hasSide=true)
 * - Optional ingredient subtraction buttons ("No X")
 *
 * Props:
 * @param {Object} order  - Full cart item object as stored in CartContext
 * @param {string} title  - Name of the menu item
 * @param {string} price  - Display price (formatted string)
 * @param {boolean} hasSide - Whether the item supports selecting sides
 */
function CheckoutOrderItem({ order, title, price, hasSide = false }) {

    /** Menu data (full menu list from server) */
    const [data, setData] = useState([]);

    /** Ingredient list for this specific order item */
    const [ingredients, setIngredients] = useState([]);

    const { removeFromCart } = useContext(CartContext);

    /**
     * Fetch menu items + ingredient list for this item.
     * Runs once on mount.
     */
    useEffect(() => {
        async function getData() {
            // Fetch full menu data (used to extract side items)
            const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchMenu');
            const menuJson = await response.json();
            setData(menuJson);

            // Fetch ingredient list for the specific item
            const ingRes = await fetch(
                'https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchIngredients',
                fetchIngredients(title)
            );
            const ingJson = await ingRes.json();
            setIngredients(ingJson.result);
        }

        getData();
    }, []);

    /**
     * Extract only items of type "Side" so they can be displayed
     * as selectable add-ons.
     */
    const newData = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "Side") {
            newData.push(data[i]);
        }
    }

    return (
        <section class="checkout-order-item-container">

            {/* Main row for the item */}
            <section class="checkout-order-item">
                <div class="checkout-order-img-container"></div>

                <div class="checkout-order-title">{title}</div>
                <div class="checkout-order-price">{price}</div>

                {/* Remove item from cart */}
                <button
                    onClick={() => removeFromCart(order)}
                    class="checkout-order-remove-button"
                >
                    X
                </button>
            </section>

            {/* Optional side selection and ingredient removal section */}
            {hasSide && (
                <section class="checkout-order-side-container">
                    Sides

                    {/* Add-able sides */}
                    {newData.map((item, idx) => (
                        <CheckoutOrderSide
                            key={item.title + idx}
                            order={order}
                            item={item.title}
                        />
                    ))}

                    {/* Removable ingredients */}
                    {ingredients.map((item, idx) => (
                        <CheckoutOrderSide
                            key={item + idx}
                            order={order}
                            item={"No " + item}
                            type="sub"
                        />
                    ))}
                </section>
            )}
        </section>
    );
}

export default CheckoutOrderItem;
