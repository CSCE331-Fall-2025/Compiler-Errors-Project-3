import React from "react";
import styles from "../../../css/ManagerPage.module.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ManagerNavBar from "./ManagerNavBar";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"


function ManagerPage() {
    const { isManager, loaded } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }
    });

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }
    }, [isManager]);

    if(!isManager) { return; }

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
            </div>
        </>
    );
}

export default ManagerPage;