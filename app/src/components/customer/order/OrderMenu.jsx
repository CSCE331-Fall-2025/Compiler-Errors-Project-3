import React from "react";
import "../../../css/style.css";
import { useEffect, useState } from 'react';
import OrderMenuItem from './OrderMenuItem';

function Menu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getMenu() {
            const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
            const data = await response.json();
            setData(data);
        }
        getMenu();
    }, []);

    for(let i = 0; i < data.length; i++) {
        if(data[i].type === "Side") {
            data.splice(i, 1);
        }
    }

    return (
        <section class="menu">
            {data.map((item) => (
                <OrderMenuItem key={item.title} {...item} />
            ))}
        </section>
    );
}

export default Menu;