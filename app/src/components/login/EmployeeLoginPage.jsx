import React from 'react';
import NavBar from "../NavBar";
import "../../css/checkout.css";
import EmployeeLoginField from "./EmployeeLoginField";

function EmployeeLoginPage(){
    return(
        <>
            <NavBar></NavBar> 
            <EmployeeLoginField></EmployeeLoginField>
        </>
    );
}

export default EmployeeLoginPage;