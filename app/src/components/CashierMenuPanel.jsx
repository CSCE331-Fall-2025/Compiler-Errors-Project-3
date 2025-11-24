import React from "react";

function CashierMenuPanel(){
    return(
        <section class = "menu-panel">
            <h1>Menu Items</h1>
            <div id = "menuItems" class = "menuItems">
                {/* items will be added here or served by server side */}
                <div class = "empty">Your cart is empty</div>
            </div>
        </section>
    );
}

export default CashierMenuPanel;