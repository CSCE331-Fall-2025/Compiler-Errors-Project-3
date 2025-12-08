import React, { useEffect, useState } from "react";
import ManagerNavBar from "./ManagerNavBar";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

/**
 * ManagerMenuAddPage component.
 *
 * Renders a form for the manager to add a new menu item, including image upload,
 * nutritional info, type, price, seasonal flag, and selection of inventory ingredients.
 *
 * @component
 * @returns {JSX.Element} Add Menu Item page
 */
export default function ManagerMenuAddPage() {
    const nav = useNavigate();

    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }

    });

    if(!isManager) { return; }

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState("");
    const [calories, setCalories] = useState("");
    const [type, setType] = useState("Entree");
    const [price, setPrice] = useState("");
    const [seasonal, setSeasonal] = useState(false);

    const [inventory, setInventory] = useState([]);
    const [selected, setSelected] = useState(new Set());;

    useEffect(() => {
        async function getInventory() {
            try {
                const res = await fetch("http://localhost:3000/api/Manager/fetchInventory");
                const data = await res.json();

                setInventory(data || []);
            } catch (err) {
                console.error("fetch inventory", err);
            }
        }
        getInventory();
    }, []);

    function handleImagePick(e) {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        setImageFile(f);
        setImagePreview(URL.createObjectURL(f));
    }

    function toggleIngredient(name) {
        setSelected(prev => {
            const copy = new Set(prev);
            if (copy.has(name)) copy.delete(name);
            else copy.add(name);
            return copy;
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const ingredients = Array.from(selected);
        const ingredientsString = ingredients.join(", ");

        const formData = new FormData();
        if (imageFile) formData.append("img", imageFile);
        
        formData.append("name", name);
        formData.append("calories", calories);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("seasonal", seasonal ? "true" : "false");
        formData.append("ingredients", ingredientsString);

        try {
            const res = await fetch("http://localhost:3000/api/Manager/addMenuItem", {
                method: "POST",
                body: formData
            });
            
            if (!res.ok) throw new Error("add failed");
            
            nav("/employee/manager/menu");
        } catch (err) {
            console.error("submit failed", err);
        }
    }

  return (
    <>
        <ManagerNavBar />
        <div className="edit-page">
        <div className="edit-menu-card">
            <h2 className="menu-add-title">Add Menu Item</h2>

            <form className="menu-add-split" onSubmit={handleSubmit}>

            <div className="menu-left">
                <label className="image-box-label">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagePick}
                    style={{ display: "none" }}
                />
                <div className="image-box" title="Click to select image">
                    {imagePreview ? (
                    <img src={imagePreview} alt="preview" />
                    ) : (
                    <div className="image-box-placeholder">Select Image</div>
                    )}
                </div>
                </label>

                <label className="field">
                <span className="field-label">Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>

                <label className="field">
                <span className="field-label">Calories</span>
                <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </label>

                <label className="field">
                <span className="field-label">Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Entree">Entree</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Side">Side</option>
                </select>
                </label>

                <label className="field">
                <span className="field-label">Price</span>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>

                <label className="field">
                <span className="field-label">Seasonal</span>
                <select value={seasonal ? "true" : "false"} onChange={(e) => setSeasonal(e.target.value === "true")}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
                </label>

            </div>

            <div className="menu-right">
                <div className="ingredients-header">
                <div className="ingredients-title">Ingredients</div>
                <div className="ingredients-sub">Click tiles to toggle selection</div>
                </div>

                <div className="ingredients-grid">
                {inventory.map(inv => {
                    const nameKey = typeof inv.name === "string" ? inv.name : String(inv.name);
                    const isSelected = selected.has(nameKey);
                    return (
                    <button
                        type="button"
                        key={inv.id ?? nameKey}
                        className={`ingredient-tile ${isSelected ? "selected" : ""}`}
                        onClick={() => toggleIngredient(nameKey)}
                    >
                        {nameKey}
                    </button>
                    );
                })}
                </div>
                
                <div className="submit-row">
                    <button type="submit" className="submit-btn">Add Item</button>
                </div>
            </div>
            </form>
        </div>
        </div>
    </>
  );
}
