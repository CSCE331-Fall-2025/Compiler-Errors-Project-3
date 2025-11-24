import React from 'react';
import CashierOrderListItems from './CashierOrderListItems';
import "../css/cashier.css";

function CashierOrderList(){
    return(
        <aside class = "cashier-order-list">
            <h1>Order details</h1>
            <div id = "cashierOrderItems" class = "cashierOrderItems">
                {/* items will be added here or served by server side */}
                <div class = "summary-row">
                    <span>Items</span>
                    <CashierOrderListItems></CashierOrderListItems>
                </div>
                <button onClick={checkout} class="checkout-button">Submit order</button>
            </div>
        </aside>
    );
}
export default CashierOrderList;