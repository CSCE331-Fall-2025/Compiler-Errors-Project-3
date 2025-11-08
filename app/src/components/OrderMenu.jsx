import React from "react";
import "../css/style.css";
import { useEffect, useState } from 'react';
import OrderMenuItem from './OrderMenuItem';

function Menu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // change to async for real implementation, and uncomment
        // "async function getMenu()"
        function getMenu() {
            // const data = await fetchMenu();
            // setData(data);
            const data = [
                {
                    img: '/images/Orange Chicken.png',
                    altText: 'orng chikn',
                    title: 'Orange Chicken',
                    cal: '150 cal',
                    price: '$3.99',
                    link: 'customize.html',
                }, 
            ];
            setData(data);
        }
        getMenu();
    }, []);

    return (
        <section class="menu">
            {data.map((item) => (
                <OrderMenuItem key={item.title} {...item} />
            ))}
        </section>
    );
}

export default Menu;