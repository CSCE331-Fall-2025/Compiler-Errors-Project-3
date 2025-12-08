import React from 'react';
import CashierOrderList from './CashierOrderList';
import CashierMenuPanel from './CashierMenuPanel';
import "../../../css/cashier.css";
import { useContext, useEffect } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"

/**
 * CashierPage component.
 *
 * Displays the cashier interface, including the order list and menu panel.
 * Redirects to the 403 page if the user is not a cashier.
 *
 * @component
 * @returns {JSX.Element} The rendered cashier page
 */
function CashierPage(){

    const { isCashier, loaded } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if(!isCashier && loaded) {
            nav("/403");
        }
    });

    useEffect(() => {
            if(!isCashier && loaded) {
                nav("/403");
            }
    }, [isCashier]);

    if(!isCashier) { return; }

    return(
        <>
            <CashierOrderList></CashierOrderList>
            <CashierMenuPanel></CashierMenuPanel>
        </>
    );
}
export default CashierPage;
