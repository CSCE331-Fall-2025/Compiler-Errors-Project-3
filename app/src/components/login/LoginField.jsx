import React, { useState, useContext } from 'react';
import NavBar from '../NavBar';
import { useNavigate } from "react-router-dom";
import { validateCustomer } from "../../js/utils";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "../contexts/AuthContext";
import "../../css/checkout.css";

/**
 * LoginField renders a login form for customers.
 * Supports standard email/password login as well as Google OAuth login.
 * On successful login, redirects to the home page.
 *
 * @component
 *
 * @example
 * return <LoginField />;
 */
function LoginField(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const { authCashier, authManager, authKitchen, isManager } = useContext(AuthContext);

    async function submitForm(e) {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:3000/api/login/validateCustomer",
            validateCustomer(username, password)
        );

        if(response.status) {
            authCashier(false);
            authManager(false);
            authKitchen(false);

            nav("/");
        }
    }

    const onSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);

        authCashier(false);
        authManager(false);
        authKitchen(false);
        nav("/");
    };

    const onError = () => {
        console.log('Login Failed');
    };

    return (
        <main className="login-wrap">
            <section className="login-card" role="region" aria-label="Sign in">
                <div className="login-logo">
                    <img src="/images/pakistan.png" alt="Logo" />
                </div>

                <h1>Sign in to your customer account</h1>

                <form onSubmit={submitForm}>
                    <div className="email-section">
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
                    </div>

                    <div className="password-section">
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
                    </div>

                    <div className="switch">
                        <label>
                            - or -
                        </label>
                    </div>
                    <GoogleLogin class="google-login" onSuccess={onSuccess} onError={onError}/>

                    <div className="actions">
                        <label style={{ fontWeight: 500 }}>
                            <input type="checkbox" defaultChecked style={{ marginRight: 8 }} />
                            Remember me
                        </label>

                    </div>

                    <div style={{ marginTop: 18 }}>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default LoginField;