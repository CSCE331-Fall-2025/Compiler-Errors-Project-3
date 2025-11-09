import React from "react";
import NavBar from "./NavBar"
import styles from "../css/StaticMenuPage.module.css"

function StaticMenuPage() {
    return (
        <>
            <NavBar></NavBar>
        
            <div class="static-menu-page">
                <h1 className={styles["statich1"]}>Menu</h1>

                <div className={styles["staticmenu-section"]}>
                    <h2 className={styles["statich2"]}>Entrees</h2>
                    <div className={styles["staticmenu-grid"]}>
                    <div className={styles["staticmenu-item"]}>
                        <img src="images/Orange Chicken.png" alt="Orange Chicken"/>
                        <h3>Orange Chicken</h3>
                        <p>Crispy chicken tossed in sweet and tangy orange sauce.</p>
                        <span className={styles["staticprice"]}>$8.99</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="Images for HTML/Chicken_GrilledTeriyakiChicken.png" alt="Grilled Teriyaki Chicken"/>
                        <h3>Grilled Teriyaki Chicken</h3>
                        <p>Chicken covered in delicous teriyaki sauce</p>
                        <span className={styles["staticprice"]}>$9.49</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="Images for HTML/Kung Pao Chicken.png" alt="Kung Pao Chicken"/>
                        <h3>Kung Pao Chicken</h3>
                        <p>Spicy chicken with peanuts, bell peppers, and zucchini.</p>
                        <span className={styles["staticprice"]}>$8.79</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="Images for HTML/Beef-&-Broccoli.png" alt="Broccoli Beef"/>
                        <h3>Broccoli Beef</h3>
                        <p>Tender beef and fresh broccoli in savory ginger soy sauce.</p>
                        <span className={styles["staticprice"]}>$8.99</span>
                    </div>
                    </div>
                </div>

                <div className={styles["staticmenu-section"]}>
                    <h2 class="statich2">Sides</h2>
                    <div className={styles["staticmenu-grid"]}>
                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Fried Rice"/>
                        <h3>Fried Rice</h3>
                        <p>Classic fried rice with eggs, peas, and carrots.</p>
                        <span className={styles["staticprice"]}>$3.99</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Chow Mein"/>
                        <h3>Chow Mein</h3>
                        <p>Soft noodles stir-fried with onions, celery, and cabbage.</p>
                        <span className={styles["staticprice"]}>$3.99</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Steamed Rice"/>
                        <h3>Steamed White Rice</h3>
                        <p>Fluffy white rice, perfect with any entrée.</p>
                        <span className={styles["staticprice"]}>$2.99</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Brown Rice"/>
                        <h3>Brown Steamed Rice</h3>
                        <p>Healthy and hearty steamed brown rice.</p>
                        <span className={styles["staticprice"]}>$2.99</span>
                    </div>
                    </div>
                </div>

                <div className={styles["staticmenu-section"]}>
                    <h2 class="statich2">Appetizers & Drinks</h2>
                    <div className={styles["staticmenu-grid"]}>
                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Veggie Spring Rolls"/>
                        <h3>Veggie Spring Rolls (2)</h3>
                        <p>Crispy rolls filled with seasoned vegetables.</p>
                        <span className={styles["staticprice"]}>$4.25</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Cream Cheese Rangoon"/>
                        <h3>Cream Cheese Rangoon</h3>
                        <p>Fried wontons stuffed with cream cheese filling.</p>
                        <span className={styles["staticprice"]}>$4.49</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Fountain Drink"/>
                        <h3>Fountain Drink</h3>
                        <p>Choose from Coke, Diet Coke, Sprite, and more.</p>
                        <span className={styles["staticprice"]}>$2.25</span>
                    </div>

                    <div className={styles["staticmenu-item"]}>
                        <img src="https://via.placeholder.com/250x150" alt="Bottled Water"/>
                        <h3>Bottled Water</h3>
                        <p>Refreshing purified bottled water.</p>
                        <span className={styles["staticprice"]}>$1.99</span>
                    </div>
                    </div>
            </div>
        </div>
        </>
    );
}

export default StaticMenuPage;