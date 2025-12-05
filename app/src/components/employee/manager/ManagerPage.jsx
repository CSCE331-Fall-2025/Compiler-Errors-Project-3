import React from "react";
import styles from "../../../css/ManagerPage.module.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ManagerNavBar from "./ManagerNavBar";


function ManagerPage() {
    return (
        <>
            <div class={styles["manager-portal-page"]}>
                <div class={styles["manager-portal-title"]}>PARODY EXPRESS MANAGER PORTAL</div>
                <div class={styles["manager-portal"]}>
                    <Link to="/employee/manager/data"><div class={styles["manager-portal-card"]}>
                        DATA
                    </div></Link>
                    <Link to="/employee/manager/staff"><div class={styles["manager-portal-card"]}>
                        EMPLOYEES
                    </div></Link>
                    <Link to="/employee/manager/menu"><div class={styles["manager-portal-card"]}>
                        MENU
                    </div></Link>
                    <Link to="/employee/manager/inventory"><div class={styles["manager-portal-card"]}>
                        INVENTORY
                    </div></Link>
                    <Link to="/employee/manager/stats"><div class={styles["manager-portal-card"]}>
                        STATS AND REPORTS
                    </div></Link>
                </div>
                
                <div style={{ marginTop: 12 }}>
                    <button //You don't need to output it to console. Regardless, you will need to call the endpoint to get your cookie data.
                        type="button"
                        onClick={() => {
                        fetch("http://localhost:3000/checkAuth", {
                        method: "POST",
                        credentials: "include"
                        })
                        .then(res => res.json()) // parses the JSON body
                        .then(data => {
                        console.log("Raw JSON:", JSON.stringify(data));          // full payload
                        console.log("typeof data.userType:", typeof data.userType);
                        console.log("userType value:", data.userType);
                        if (typeof data.userType === "object" && data.userType) {
                            console.log("userType keys:", Object.keys(data.userType));
                        }
                        })
                        .catch(err => console.error("Fetch error:", err));


                        }}
                        

                        style={{
                        backgroundColor: "#4285F4",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: 4
                        }}
                    >
                        Check Auth (Output in FrontEnd Console)
                    </button>
                    </div>
            </div>
        </>
    );
}

export default ManagerPage;