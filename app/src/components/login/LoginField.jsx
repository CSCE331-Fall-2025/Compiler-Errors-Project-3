import React from 'react'
import NavBar from '../NavBar'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateCustomer } from "../../js/utils";
import "../../css/checkout.css"

function LoginField(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submitForm(e) {
        e.preventDefault(); 
        
        const res = await fetch("http://localhost:3000/api/Manager/validateCustomer", validateCustomer(username, password));
        console.log(res.body);
    }

    return (
        <main className="login-wrap">
            <section className="login-card" role="region" aria-label="Sign in">
                <h1>Sign in to your account</h1>

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

export default LoginField;