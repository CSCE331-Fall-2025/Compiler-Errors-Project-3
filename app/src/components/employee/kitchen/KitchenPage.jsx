import React from "react";
import { useEffect, useState } from 'react';
import OrderCard from "./KitchenOrderCard";
import "../../../css/style.css";

function KitchenPage() {
    const [orders, setOrders] = useState([]);
    async function getOrders() {
        const response = await fetch("http://localhost:3000/api/Kitchen/getPending");

        setOrders(await response.json());
    }
    useEffect(() => {
        getOrders();
    }, [orders]);

    async function completeOrder(id) {
        await fetch(`http://localhost:3000/api/Kitchen/completeOrder?id=${id}`);
        getOrders();
    }

    console.log(orders);


    return (
        <>
            <div class="kitchen-title">KITCHEN VIEW</div>
            <div class="kitchen-page"> 
                <div class="kitchen-orders">
                    {orders.map((order, i) => (
                        <OrderCard key={order.item+i} {...order} completeOrder={completeOrder}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default KitchenPage;