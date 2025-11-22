import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"


function Hero() {
    return (
        <>
            <section className="hero">
                <div className="order-button">
                    <Link to="/order">Order Now</Link>
                </div>
            </section>

            {/* section bottom one below */}
            <section className="popular-section">
                <div className="popular-content-grid">
                    <div className="popular-left">
                        <h2 className="popular-title">Popular item</h2>
                        <p className="popular-description">
                            Crispy chicken tossed in sweet and tangy orange sauce.
                        </p>
                        <p className="popular-review">Customer Review : </p>      
                        <p className="popular-review">I don't understand the bad reviews, place is great, workers were very kind, good ambiance, and the best food out of every Parody Express I've been to.</p>
                    </div>
                    <div className="popular-right">
                        <div className="popular-image-container">
                            <img
                                src="/images/Orange Chicken.png"
                                className="popular-food-image"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;