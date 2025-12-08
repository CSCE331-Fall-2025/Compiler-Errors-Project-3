import React, {useEffect, useState} from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import DataRowEntry from "./ManagerDataRowEntry";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"

/**
 * ManagerDataPage component.
 *
 * Renders the manager's data page, including sorting, filtering, and pagination controls,
 * and displays the fetched rows in a data viewer. Ensures only managers can access this page.
 *
 * @component
 * @returns {JSX.Element} The manager data page UI
 */
function ManagerDataPage() {
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState("date");
    const [filterType, setFilterType] = useState("none");
    const [filterValue, setFilterValue] = useState(null);
    const [limit, setLimit] = useState(100);
    const [rows, setRows] = useState([]);

    const nav = useNavigate();

    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }

    });

    if(!isManager) { return; }


    useEffect(() => {
        async function getRows() {
            const response = await fetch(
                `http://localhost:3000/api/Manager/fetchData?sort=${sort}&filterType=${filterType}&filterValue=${filterValue}&limit=${limit}&page=${page}`
            );
            setRows(await response.json());
        }
        getRows();
    }, [page, sort, filterType, filterValue, limit]);

    async function filterDefault(v) {
        if(v === "none") {
            setFilterValue(null);
        } else if(v === "item") {
            setFilterValue("");
        } else if(
            v === "year" ||
            v === "month" ||
            v === "day" ||
            v === "hour" ||
            v === "minute" ||
            v === "second" ||
            v === "qty"
        ) {
            setFilterValue(0);
        } else if (v === "price") {
            setFilterValue(0.0);
        }
    }

    async function pageLeft() {
        if(page != 0) {
            setPage(page - 1);
        }
    }

    async function pageRight() {
        setPage(page + 1);
    }

    return (
    <>
        <ManagerNavBar/>
        <div class="manager-data-page">
            <div class="manager-data-buttons-container">
                <div class="manager-data-sort-button">
                    <select onChange={(e) => setSort(e.target.value)} class="manager-data-sort">
                        <option value="date" selected>Sort by Date</option>
                        <option value="time">Sort by TIme</option>
                        <option value="item">Sort by Item</option>
                        <option value="qty">Sort by Quantity</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>

                <div class="manager-data-filter-button">
                    <select onChange={(e) => {
                            filterDefault(e.target.value);
                            setFilterType(e.target.value);
                        }} class="manager-data-filter">
                        <option value="none" select>Filter by...</option>
                        <option value="year">Filter by Year</option>
                        <option value="month">Filter by Month</option>
                        <option value="day">Filter by Day</option>
                        <option value="hour">Filter by Hour</option>
                        <option value="minute">Filter by Minute</option>
                        <option value="second">Filter by Second</option>
                        <option value="item">Filter by Item</option>
                        <option value="qty">Filter by Quantity</option>
                        <option value="price">Filter by Price</option>
                    </select>
                    
                    {filterType === "item" ? (
                        <input
                            type="text"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder="Enter item name"
                        />
                    ) : filterType === "price" ? (
                        <input
                            type="number"
                            step="0.01"
                            value={filterValue}
                            min="0"
                            onChange={(e) => {
                                let v = e.target.value;

                                if (v === "") {
                                    setFilterValue("");
                                    return;
                                }

                                if (v.includes(".")) {
                                    const [intPart, decPart] = v.split(".");
                                    if (decPart.length > 2) {
                                        v = intPart + "." + decPart.slice(0, 2);
                                    }
                                }

                                v = v.replace(RegExp(`^[0]+(?=[0-9])`), "");

                                setFilterValue(v);
                            }}
                            placeholder="Enter price"
                        />
                    ) : (
                        <input
                            type="number"
                            value={filterValue}
                            min="0"
                            onChange={(e) => {
                                let v = e.target.value;

                                if (v === "") {
                                    setFilterValue("");
                                    return;
                                }

                                if (v.includes(".")) {
                                    const [intPart, decPart] = v.split(".");
                                    v = intPart;
                                }

                                v = v.replace(RegExp(`^[0]+(?=[0-9])`), "");

                                setFilterValue(v);

                            }}
                            placeholder="Enter number"
                        />
                    )}

                </div>

                <div class="manager-data-limit-field">
                    Limit
                    <input type="number" value={limit} min="0" class="manager-data-limit"
                        onChange={(e) => {
                                    let v = e.target.value;

                                    if (v === "") {
                                        setLimit(0);
                                        return;
                                    }

                                    if (v.includes(".")) {
                                        const [intPart, decPart] = v.split(".");
                                        v = intPart;
                                    }

                                    v = v.replace(RegExp(`^[0]+(?=[0-9])`), "");

                                    setLimit(v);

                                }}
                        placeholder="Enter number"
                    >
                    </input>
                </div>
                <button onClick={pageLeft} class="manager-data-page-left">
                    <p>{"<"}</p>
                </button>

                <button onClick={pageRight} class="manager-data-page-right">
                    <p>{">"}</p> 
                </button>
            </div>

            <div class="manager-data-viewer-container">
                <div class="manager-data-viewer-column-header">
                    <div class="manager-data-date">DATE</div>
                    <div class="manager-data-time">TIME</div>
                    <div class="manager-data-item">ITEM</div>
                    <div class="manager-data-qty">QTY</div>
                    <div class="manager-data-price">PRICE</div>
                </div>
                
                <div class="manager-data-viewer">
                    {rows.map((row, idx) => (
                        <DataRowEntry key={idx} date={row.date.slice(0, 10)} time={row.time} item={row.item} qty={row.qty} price={"$"+row.price.toFixed(2)}/>
                    ))}
                </div>
                
            </div>
        </div>
    </>
    );
}

export default ManagerDataPage;