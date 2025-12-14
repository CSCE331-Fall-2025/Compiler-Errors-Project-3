import React from "react";
import "../../../css/style.css";
import { useEffect, useState } from 'react';
import OrderMenuItem from './OrderMenuItem';

/**
 * Menu component fetches the restaurant menu and displays it.
 * Filters out items with type "Side".
 *
 * @component
 *
 * @example
 * return <Menu />;
 */
function Menu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        /**
         * Fetches menu data from the API and updates state.
         */
        async function getMenu() {
            const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchMenu');
            const data = await response.json();
            console.log
            setData(data);
        }
        getMenu();
    }, []);

    // Remove items of type "Side"
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
