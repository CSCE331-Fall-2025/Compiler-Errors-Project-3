import React from 'react';
import NavBar from "./NavBar";
import "../css/checkout.css";
import LoginField from "./LoginField";

function EmployeeLoginPage(){
    return(
        <>
            <NavBar></NavBar> 
            <LoginField></LoginField>
        </>
    );
}

export default EmployeeLoginPage;