import React from "react";
import { useEffect, useState } from 'react';
import "../../../css/style.css";

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