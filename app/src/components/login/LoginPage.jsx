import React from 'react'
import NavBar from "../NavBar"
import { Link } from "react-router-dom";
import "../../css/checkout.css"
import LoginField from "./LoginField";

function LoginPage(){
    return(
        <>
            <NavBar></NavBar> 
            <LoginField></LoginField>
            <div class="muted">Are you an employee?<Link to="/employee/login"> Login</Link></div>
            <div class="muted">Don't have an account? Register</div>
        </>
    );
}

export default LoginPage;