import React from 'react'
import NavBar from "./NavBar"
import Hero from "./Hero"
import "../css/checkout.css"

function LoginPage(){
    return(
        <>
            <NavBar></NavBar> 
            <main class="login-wrap">
                <section class="login-card" role="region" aria-label="Sign in">
                    <h1>Sign in to your account</h1>

                    <form>
                        <div class="form-row">
                            <label for="email">Email</label>
                            <input id="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <div class="form-row">
                            <label for="password">Password</label>
                            <input id="password" type="password" placeholder="Password" required />
                        </div>

                        <div class="actions">
                            <div><label style={{fontWeight:500}}><input type="checkbox" defaultCheckedhecked style={{marginRight:8}}/> Remember me</label></div>
                            <div><a href="#" style={{color:"#777",textDecoration:"underline"}}>Forgot password?</a></div>
                        </div>

                        <div style={{marginTop:18}}>
                            <button type="submit" class="btn-sign">Sign In</button>
                        </div>
                    </form>

                    <div class="muted">Don't have an account? <a href="#">Register</a></div>
                </section>
            </main>
        </>
    );
}

export default LoginPage;