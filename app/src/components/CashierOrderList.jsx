import React from 'react';

function CashierOrderList(){
    return(
        <aside class = "cashier-order-list">
            <h1>Order details</h1>
            <div id = "cashierOrderItems" class = "cashierOrderItems">
                {/* items will be added here or served by server side */}
                <div class = "summary-row">
                    <span>Items</span>
                    <span id = "summary-count">0</span>
                </div>
                <button id = "submitOrders" class = "cashier-btn">Submit Order</button>
            </div>
        </aside>
    );
}
export default CashierOrderList;