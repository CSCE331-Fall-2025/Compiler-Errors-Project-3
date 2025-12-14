import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";

function Hero() {
    return (
        <main>
            {/* Hero section */}
            <section className="hero">
                <div className="order-button">
                    <Link to="/order">Order Now</Link>
                </div>
            </section>

            {/* Popular item section */}
            <section className="popular-section" aria-labelledby="popular-title">
                <div className="popular-content-grid">
                    <div className="popular-left">
                        <h1>‎</h1>
                        <h2 id="popular-title" className="popular-title">
                            Popular item
                        </h2>
                        <p className="popular-description">
                            Crispy chicken tossed in sweet and tangy orange sauce.
                        </p>
                        <p className="popular-review-label">
                            Customer Review:
                        </p>
                        <p className="popular-review">
                            I don't understand the bad reviews, place is great,
                            workers were very kind, good ambiance, and the best
                            food out of every Parody Express I've been to.
                        </p>
                    </div>

                    <div className="popular-right">
                        <div className="popular-image-container">
                            <img
                                src="/images/Orange Chicken gif.gif"
                                className="popular-food-image"
                                alt="Plate of crispy orange chicken in sweet and tangy sauce"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Hero;