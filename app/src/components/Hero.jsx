import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"


function Hero() {
    return (
        <section class="hero">
            <Link to="/order"><div class="order-button">
                Order Now
            </div></Link>
        </section>
    );
}

export default Hero;