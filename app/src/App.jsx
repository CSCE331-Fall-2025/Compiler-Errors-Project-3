import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/customer/HomePage";
import OrderPage from "./components/customer/order/OrderPage";
import StaticMenuPage from "./components/customer/StaticMenuPage";
import ManagerPage from "./components/employee/manager/ManagerPage";
import CheckoutPage from "./components/customer/checkout/CheckoutPage";
import LocationsPage from "./components/customer/locations/LocationsPage";
import LoginPage from "./components/login/LoginPage";
import EmployeeLoginPage from "./components/login/EmployeeLoginPage";
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