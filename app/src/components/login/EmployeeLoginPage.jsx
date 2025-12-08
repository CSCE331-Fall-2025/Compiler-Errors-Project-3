import React from 'react';
import NavBar from "../NavBar";
import "../../css/checkout.css";
import EmployeeLoginField from "./EmployeeLoginField";

/**
 * EmployeeLoginPage renders the page for employee login.
 * It includes the navigation bar and the EmployeeLoginField component.
 *
 * @component
 *
 * @example
 * return <EmployeeLoginPage />;
 */
function EmployeeLoginPage() {
    return (
        <>
            <NavBar />
            <EmployeeLoginField />
        </>
    );
}

export default EmployeeLoginPage;
