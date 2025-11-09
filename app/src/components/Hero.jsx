import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"


function Hero() {
    return (
        <section class="hero">
            <div class="order-button">
                <Link to="/order">Order Now</Link>
            </div>
        </section>
    );
}

export default Hero;