import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import OrderPage from "./components/OrderPage";
import StaticMenuPage from "./components/StaticMenuPage";
import ManagerPage from "./components/ManagerPage";
import CheckoutPage from "./components/CheckoutPage";
import LocationsPage from "./components/LocationsPage";
import LoginPage from "./components/LoginPage";
import EmployeeLoginPage from "./components/EmployeeLoginPage";
import ManagerStaffPage from "./components/employee/manager/ManagerStaffPage";
import CashierPage from "./components/CashierPage";
import "./css/style.css";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/order" element={<OrderPage/>}></Route>
                <Route path="/menu" element={<StaticMenuPage/>}></Route>
                <Route path="/employee/Manager" element={<ManagerPage/>}></Route>
                <Route path="/checkout" element={<CheckoutPage/>}></Route>
                <Route path="/locations" element={<LocationsPage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/employee/login" element={<EmployeeLoginPage/>}></Route>
                <Route path="/employee/manager/staff" element={<ManagerStaffPage/>}></Route>
                <Route path="/employee/cashier" element={<CashierPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;