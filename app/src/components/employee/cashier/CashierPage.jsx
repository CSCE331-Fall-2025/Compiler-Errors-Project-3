import React from 'react';
import CashierOrderList from './CashierOrderList';
import CashierMenuPanel from './CashierMenuPanel';
import "../../../css/cashier.css";

function CashierPage(){
    return(
        <>
            <CashierOrderList></CashierOrderList>
            <CashierMenuPanel></CashierMenuPanel>
        </>
    );
}
export default CashierPage;