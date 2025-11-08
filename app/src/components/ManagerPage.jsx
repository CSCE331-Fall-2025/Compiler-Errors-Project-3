import React from "react";
import styles from "../css/ManagerPage.module.css";
import { useEffect, useState } from 'react';
import NavBar from "./NavBar"
import EmployeeAddForm from "./EmployeeAddForm"
import EmployeeDeleteForm from "./EmployeeDeleteForm"
import EmployeeUpdateForm from "./EmployeeUpdateForm"
import InventoryAddForm from "./InventoryAddForm"
import InventoryUpdateForm from "./InventoryUpdateForm"
import MenuAddForm from "./MenuAddForm"
import MenuUpdateForm from "./MenuUpdateForm"
import MenuDeleteForm from "./MenuDeleteForm"


function ManagerPage() {
    return (
        <>
            <NavBar></NavBar>

            <div className={styles["container"]}>
                <h1>Employee Manager</h1>
                <EmployeeAddForm></EmployeeAddForm>
                <EmployeeUpdateForm></EmployeeUpdateForm>
                <EmployeeDeleteForm></EmployeeDeleteForm>
                <MenuAddForm></MenuAddForm>
                <MenuUpdateForm></MenuUpdateForm>
                <MenuDeleteForm></MenuDeleteForm>
                <InventoryAddForm></InventoryAddForm>
                <InventoryUpdateForm></InventoryUpdateForm>
            </div>

        </>
    );
}

export default ManagerPage;