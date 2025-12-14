import React, { useEffect, useState, useContext } from "react";
import OrderCard from "./KitchenOrderCard";
import "../../../css/style.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * KitchenPage component displays the kitchen dashboard with all pending orders.
 * Each order is shown using the OrderCard component and can be marked as complete.
 *
 * @component
 *
 * @example
 * return <KitchenPage />;
 */
function KitchenPage() {
    const [orders, setOrders] = useState([]);

    const { kitchenAccess, loaded } = useContext(AuthContext);
    const nav = useNavigate();
    
    useEffect(() => {
        if(!kitchenAccess && loaded) {
            nav("/403");
        }
    });

    useEffect(() => {
            if(!kitchenAccess && loaded) {
                nav("/403");
            }
    }, [kitchenAccess]);

    if(!kitchenAccess) { return; }

    /**
     * Fetches the list of pending orders from the backend.
     */
    async function getOrders() {
        const response = await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Kitchen/getPending");
        setOrders(await response.json());
    }

    /**
     * Marks a specific order as complete and refreshes the list of pending orders.
     * 
     * @param {number|string} id - The ID of the order to mark as complete.
     */
    async function completeOrder(id) {
        await fetch(`https://compiler-errors-project-3-backend.onrender.com/api/Kitchen/completeOrder?id=${id}`);
        getOrders();
    }

    useEffect(() => {
        getOrders();
    }, [orders]); // Currently this may cause repeated fetching; consider using [] instead.

    console.log(orders);

    return (
        <>
            <div class="kitchen-title">KITCHEN VIEW</div>
            <div class="kitchen-page"> 
                <div class="kitchen-orders">
                    {orders.map((order, i) => (
                        <OrderCard key={order.item + i} {...order} completeOrder={completeOrder} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default KitchenPage;
