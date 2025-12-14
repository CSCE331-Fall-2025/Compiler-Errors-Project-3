import React from "react";
import "../../../css/style.css";
import ManagerNavBar from "./ManagerNavBar";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

/**
 * ManagerStaffAddPage component.
 *
 * Renders a form to add a new staff member with profile image, name, role, email, and phone number.
 *
 * @component
 * @returns {JSX.Element} Add staff page
 */
function ManagerStaffAddPage() {
    const nav = useNavigate();

    const [imgPreview, setImgPreview] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }
    }, [isManager, loaded, nav]);

    if(!isManager) { return null; }

    function handleImageSelect(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImgFile(file);
        setImgPreview(URL.createObjectURL(file));
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("email", email);
        formData.append("phone", phone);
        if (imgFile) formData.append("img", imgFile);

        await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Manager/addEmployee", {
            method: "POST",
            body: formData
        });
    }

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "");

        if (digits.length === 0) return "";
        if (digits.length < 4) return `(${digits}`;
        if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    const handleChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setPhone(formatted);
    };

    return (
        <>
            <ManagerNavBar/>
            <div className="edit-page">
                <div className="add-card-template">
                    <div className="add-card">
                        <label className="staff-add-pfp-container">
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageSelect}/>
                            <div className="staff-add-pfp-circle">
                                {imgPreview ? (
                                    <img src={imgPreview} alt="pfp" />
                                ) : (
                                    <span>Select Image</span>
                                )}
                            </div>
                        </label>

                        <input className="staff-add-input" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="staff-add-input">
                            <option value="Manager">Manager</option>
                            <option value="Cashier">Cashier</option>
                        </select>
                        <input className="staff-add-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className="staff-add-input" type="tel" placeholder="Phone" value={phone} onChange={handleChange}/>

                        <button className="staff-add-btn" onClick={handleSubmit}>
                            Add Staff
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerStaffAddPage;
