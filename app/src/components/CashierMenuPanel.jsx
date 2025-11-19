import React, { useState, useEffect } from "react";
import CashierMenuItem from './CashierMenuItem';

function CashierMenuPanel(){
    const [data, setData] = useState([]);
    
        useEffect(() => {
        // change to async for real implementation, and uncomment
        // "async function getMenu()"
        async function getMenu() {
            const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
            const data = await response.json();
            console.log
            setData(data);
            // const data = [
            //     {
            //         img: '/images/Orange Chicken.png',
            //         altText: 'orng chikn',
            //         title: 'Orange Chicken',
            //         cal: '150 cal',
            //         price: '$3.99',
            //         link: 'customize.html',
            //     }, 
            // ];
            // setData(data);
        }
        getMenu();
    }, []);
    return(
        <section class="menu-panel">
            {data.map((item) => (
                <CashierMenuItem key={item.title} {...item} />
            ))}
        </section>
    );
}

export default CashierMenuPanel;