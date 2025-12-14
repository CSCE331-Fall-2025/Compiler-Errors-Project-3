import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import ManagerNavBar from "./ManagerNavBar";
import ReportRow from "./XZReportRow";
import "../../../css/style.css";
import { AuthContext } from "../../contexts/AuthContext";

function ManagerStatsPage() {
    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2025-12-31");
    const [graph, setGraph] = useState("profit");
    const [report, setReport] = useState({});

    const nav = useNavigate();
    const { isManager, loaded, zReport, disableZReport } = useContext(AuthContext);

    useEffect(() => {
        if (!isManager && loaded) {
            nav("/403");
        }
    }, [isManager, loaded, nav]);

    if (!isManager) return null;

    // Fetch stats rows based on date range
    useEffect(() => {
        async function getRows() {
            if (!startDate || !endDate) {
                setRows([]);
                return;
            }
            try {
                const response = await fetch(
                    `https://compiler-errors-project-3-backend.onrender.com/api/Manager/fetchStats?startDate=${startDate}&endDate=${endDate}`
                );
                const data = await response.json();
                setRows(data);
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            }
        }
        getRows();
    }, [startDate, endDate]);

    // X Report
    async function XReport() {
        try {
            const response = await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Manager/getXReport");
            const data = await response.json();
            const reportData = {};
            for (let i = 0; i < 24; i++) reportData[i] = 0;
            data.forEach(d => { reportData[d.hour] += d.qty; });
            setReport(reportData);
        } catch (err) {
            console.error("Failed to generate X report:", err);
        }
    }

    // Z Report
    async function ZReport() {
        if(!zReport) {
            window.confirm("Cannot create more than one Z report per day");
            return;
        }

        if (window.confirm("Create Z report?")) {
            disableZReport();
            XReport();
        }
    }

    // Helper functions for graph data
    const salesVsTime = () => {
        if (!rows.length) return [];
        const data = [];
        let currentMonth = rows[0].date.split("-")[1];
        let profit = 0;

        rows.forEach(row => {
            const month = row.date.split("-")[1];
            if (month !== currentMonth) {
                data.push(profit);
                profit = 0;
                currentMonth = month;
            }
            profit += row.qty * row.price;
        });
        data.push(profit);

        return [{ item: "Total sales ($)", data }];
    };

    const volumeVsTime = () => {
        if (!rows.length) return [];
        const data = [];
        let currentMonth = rows[0].date.split("-")[1];
        let volume = 0;

        rows.forEach(row => {
            const month = row.date.split("-")[1];
            if (month !== currentMonth) {
                data.push(volume);
                volume = 0;
                currentMonth = month;
            }
            volume += row.qty;
        });
        data.push(volume);

        return [{ item: "Total sales (volume)", data }];
    };

    const volumeItemVsTime = () => {
        if (!rows.length) return [];
        const items = {};
        let currentMonth = rows[0].date.split("-")[1];
        const template = [];

        rows.forEach(row => {
            const month = row.date.split("-")[1];
            if (month !== currentMonth) {
                Object.keys(items).forEach(key => {
                    items[key].volumes.push(items[key].currentVolume);
                    items[key].currentVolume = 0;
                });
                currentMonth = month;
                template.push(0);
            }

            if (items[row.item]) items[row.item].currentVolume += row.qty;
            else items[row.item] = { volumes: [...template], currentVolume: row.qty };
        });

        Object.keys(items).forEach(key => items[key].volumes.push(items[key].currentVolume));

        return Object.keys(items).map(key => ({
            item: key,
            data: items[key].volumes
        }));
    };

    let line = [];
    if (graph === "profit") line = salesVsTime();
    else if (graph === "volume") line = volumeVsTime();
    else if (graph === "itemVolume") line = volumeItemVsTime();

    if (!line.length) return null;

    const labels = line[0].data.map((_, i) => `Month ${i + 1}`);
    const datasets = line.map((entry, i) => ({
        label: entry.item,
        data: entry.data,
        borderColor: `rgba(${(4*((i+10)*(i+3))) % 255}, ${(2*((i+6)*(i+1))) % 255}, ${(7*((i+8)*(i+3))) % 255}, 1)`,
        fill: false
    }));

    const data = { labels, datasets };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { ticks: { maxTicksLimit: 10, autoSkip: true } } }
    };

    return (
        <>
            <ManagerNavBar />
            <div className="manager-stats-page">
                <div className="manager-stats-graph-container">
                    <div className="manager-stats-selectors">
                        <select
                            value={graph}
                            onChange={(e) => setGraph(e.target.value)}
                            className="manager-stats-graph-selector"
                        >
                            <option value="profit">Sales vs. Time</option>
                            <option value="volume">Volume vs. Time</option>
                            <option value="itemVolume">Volume (by item) vs. Time</option>
                        </select>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className="manager-stats-graph">
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className="manager-stats-reports-container">
                    <div className="manager-stats-report-viewer">
                        {Object.keys(report).map(row => (
                            <ReportRow key={row} hour={row} value={report[row]} />
                        ))}
                    </div>
                    <button onClick={XReport} className="manager-stats-x-report">Create X Report</button>
                    <button onClick={ZReport} className="manager-stats-z-report">Create Z Report</button>
                </div>
            </div>
        </>
    );
}

export default ManagerStatsPage;
