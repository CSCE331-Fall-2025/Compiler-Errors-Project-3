import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";

function ManagerStaffPage() {
  return (
    <>
        <div class="manager-page-root">
            <ManagerNavBar/>
            <div class="manager-staff-page">
                <div class="manager-staff-list">
                    <div class="manager-staff-card">

                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default ManagerStaffPage;