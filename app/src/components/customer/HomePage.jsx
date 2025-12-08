import React from "react";
import NavBar from "../NavBar";
import Hero from "../Hero";
import "../../css/style.css";

/**
 * Home page component displaying the navigation bar and the hero section.
 *
 * @component
 *
 * @example
 * return <HomePage />;
 */
function HomePage() {
    return (
        <>
            <NavBar></NavBar>
            <Hero></Hero>
        </>
    );
}

export default HomePage;
