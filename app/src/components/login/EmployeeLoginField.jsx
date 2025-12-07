import React, { useContext } from 'react'
import NavBar from '../NavBar'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmployee } from "../../js/utils";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "../contexts/AuthContext";
import "../../css/checkout.css"

function EmployeeLoginField(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authCashier, authManager, authKitchen} = useContext(AuthContext);
    const nav = useNavigate();

    async function submitForm(e) {
        e.preventDefault(); 
        
        var result = "FAIL";

        await fetch("http://localhost:3000/api/login/validateEmployee", validateEmployee(username, password))
        .then(res => res.json())
        .then(data => {
            result = data.result;
        });

        if(result.toUpperCase() === "MANAGER") {
            authManager(true);
            authCashier(true);
            authKitchen(true);

            nav("/Employee/Manager");
        } else if(result.toUpperCase() === "CASHIER") {
            authCashier(true);
            authManager(false);
            authKitchen(false);

            nav("/Employee/Cashier");
        }

    }

    const onSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);

        
        const response = await fetch(`http://localhost:3000/api/login/employeeLogin?user=${decoded.email}`);
        const type = await response.json();
        if(type.toUpperCase() === "MANAGER") {
            authManager(true);
            authCashier(true);
            authKitchen(true);

            nav("/Employee/Manager");

        } else if (type.toUpperCase() === "CASHIER") {
            authCashier(true);
            authManager(false);
            authKitchen(false);

            nav("/Employee/Cashier");
        }
    };

    const onError = () => {
        console.log('Login Failed');
    };


    return (
        <main className="login-wrap">
            <section className="login-card" role="region" aria-label="Sign in">
                <h1>Sign in to your employee account</h1>

                <form onSubmit={submitForm}>
                    <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="you@example.com"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <GoogleLogin class="google-login" onSuccess={onSuccess} onError={onError}/>

                    <div className="actions">
                        <div>
                            <label style={{ fontWeight: 500 }}>
                                <input type="checkbox" defaultChecked style={{ marginRight: 8 }} />
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a href="#" style={{ color: "#777", textDecoration: "underline" }}>
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div style={{ marginTop: 18 }}>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default EmployeeLoginField;