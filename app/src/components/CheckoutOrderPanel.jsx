import React from 'react';
import NavBar from './NavBar';

function OrderPanel(){
    return(
        <section class = "order-panel">
            <h1>Your order</h1>
            <div id = "orderItems" class = "orderItems">
                {/* items will be added here or served by server side */}
                <div class = "empty">Your cart is empty</div>
            </div>
        </section>
    );
}

export default OrderPanel;