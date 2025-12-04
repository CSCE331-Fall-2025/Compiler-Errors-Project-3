import React, { use } from "react";
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
import ManagerInventoryPage from "./components/employee/manager/ManagerInventoryPage";
import ManagerMenuPage from "./components/employee/manager/ManagerMenuPage";
import ManagerStaffEditPage from "./components/employee/manager/ManagerStaffEditPage";
import ManagerInventoryEditPage from "./components/employee/manager/ManagerInventoryEditPage";
import ManagerMenuEditPage from "./components/employee/manager/ManagerMenuEditPage";
import "./css/style.css";
import ManagerInventoryAddPage from "./components/employee/manager/ManagerInventoryAddPage";
import ManagerStaffAddPage from "./components/employee/manager/ManagerStaffAddPage";
import ManagerMenuAddPage from "./components/employee/manager/ManagerMenuAddPage";
import CashierPage from "./components/employee/cashier/CashierPage";
import { useEffect } from "react";
import WeatherPage from "./components/customer/WeatherPage.jsx";



function App() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: "en,es,fr,de,zh",
                },
                "google_translate_element"
            );
        };
    }, []);
    return (
        <>
            <div id = "google_translate_element">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/order" element={<OrderPage/>}></Route>
                        <Route path="/menu" element={<StaticMenuPage/>}></Route>
                        <Route path="/employee/Manager" element={<ManagerPage/>}></Route>
                        <Route path="/checkout" element={<CheckoutPage/>}></Route>
                        <Route path="/locations" element={<LocationsPage/>}></Route>
                        <Route path="/weather" element={<WeatherPage/>}></Route>
                        <Route path="/login" element={<LoginPage/>}></Route>
                        <Route path="/employee/login" element={<EmployeeLoginPage/>}></Route>
                        <Route path="/employee/manager/staff" element={<ManagerStaffPage/>}></Route>
                        <Route path="/employee/manager/menu" element={<ManagerMenuPage/>}></Route>
                        <Route path="/employee/manager/inventory" element={<ManagerInventoryPage/>}></Route>
                        <Route path="/employee/manager/inventory/add" element={<ManagerInventoryAddPage/>}></Route>
                        <Route path="/employee/manager/menu/add" element={<ManagerMenuAddPage/>}></Route>
                        <Route path="/employee/manager/staff/add" element={<ManagerStaffAddPage/>}></Route>
                        <Route path="/employee/manager/staff/:id" element={<ManagerStaffEditPage/>}></Route>
                        <Route path="/employee/manager/inventory/:id" element={<ManagerInventoryEditPage/>}></Route>
                        <Route path="/employee/manager/menu/:id" element={<ManagerMenuEditPage/>}></Route>
                        <Route path="/employee/cashier" element={<CashierPage/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;