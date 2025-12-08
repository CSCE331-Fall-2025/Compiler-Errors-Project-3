import React from "react";
import { useEffect, useState } from 'react';
import "../../../css/style.css";

/**
 * OrderCard component displays an individual order for the kitchen.
 * It shows the order ID, item name, quantity, and a button to mark the order as complete.
 *
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {number|string} props.id - Unique identifier for the order.
 * @param {string} props.item - Name of the ordered item.
 * @param {number} props.qty - Quantity of the item ordered.
 * @param {function} props.completeOrder - Function to mark the order as complete; receives order ID as an argument.
 *
 * @example
 * const completeOrder = (id) => { console.log(`Order ${id} completed.`); }
 * return <OrderCard id={123} item="Orange Chicken" qty={2} completeOrder={completeOrder} />;
 */
function OrderCard({ id, item, qty, completeOrder }) {
    return (
        <div class="kitchen-card">
            <div class="kitchen-card-info">
                <div class="kitchen-card-id">
                    Order ID: {id}
                </div>

                <div class="kitchen-card-item">
                    {item}
                </div>
            </div>
        
            <div class="kitchen-card-qty">
                Quantity: {qty}
            </div>

            <div class="kitchen-order-complete-container">
                <button onClick={() => completeOrder(id)} class="kitchen-order-complete">
                    Complete Order
                </button>
            </div>
        </div>
    );
}

export default OrderCard;
