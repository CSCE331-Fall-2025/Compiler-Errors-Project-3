import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import OrderPage from "./components/OrderPage";
import StaticMenuPage from "./components/StaticMenuPage";
import ManagerPage from "./components/ManagerPage";
import "./css/style.css";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/order" element={<OrderPage/>}></Route>
                <Route path="/menu" element={<StaticMenuPage/>}></Route>
                <Route path="/Employee/Manager" element={<ManagerPage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;