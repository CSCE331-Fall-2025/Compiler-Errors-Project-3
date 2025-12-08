import React from 'react';
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import "../../css/checkout.css";
import LoginField from "./LoginField";

/**
 * LoginPage component renders the customer login page.
 * It includes a navigation bar, the LoginField component, 
 * and links for employee login and account registration.
 *
 * @component
 *
 * @example
 * return <LoginPage />;
 */
function LoginPage() {
    return (
        <>
            <NavBar />
            <LoginField />
            <div class="muted">
                Are you an employee?<Link to="/employee/login"> Login</Link>
            </div>
            <div class="muted">Don't have an account? Register</div>
        </>
    );
}

export default LoginPage;
