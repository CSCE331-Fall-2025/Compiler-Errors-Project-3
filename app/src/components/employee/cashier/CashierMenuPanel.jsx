import React, { useState, useEffect } from "react";
import CashierMenuItem from './CashierMenuItem';

/**
 * CashierMenuPanel displays a list of menu items for the cashier view.
 * Fetches menu data from the backend and renders a `CashierMenuItem` for each item.
 *
 * @component
 *
 * @example
 * return <CashierMenuPanel />;
 */
function CashierMenuPanel() {
    const [data, setData] = useState([]);

    useEffect(() => {
        /**
         * Fetch menu data from the API.
         */
        async function getMenu() {
            try {
                const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchMenu');
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error("Failed to fetch menu data:", err);
            }
        }
        getMenu();
    }, []);

    return (
        <section className="menu-panel">
            {data.map((item) => (
                <CashierMenuItem key={item.title} {...item} />
            ))}
        </section>
    );
}

export default CashierMenuPanel;
