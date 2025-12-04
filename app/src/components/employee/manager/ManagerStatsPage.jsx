import React from "react";
import { useEffect, useState } from 'react';
import ManagerNavBar from "./ManagerNavBar";
import { Bar, Line } from "react-chartjs-2";
import "../../../css/style.css"

function ManagerStatsPage() {

    const [rows, setRows] = useState([]);
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2025-12-31");
    const [graph, setGraph] = useState("profit");

    useEffect(() => {
        async function getRows() {
            if(startDate && endDate) {
                const response = await fetch(
                    `http://localhost:3000/api/Manager/fetchStats?startDate=${startDate}&endDate=${endDate}`
                );

                setRows(await response.json());
            } else {
                setRows([]);
            }
        }
        getRows();
    }, [startDate, endDate]);

    function salesVsTime() {
        if(!rows[0]) { return; }

        const data = [];
        var currentMonth = rows[0].date.split("-")[1];
        var profit = 0;

        
        for(let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const month = row.date.split("-")[1];

            if(month !== currentMonth) {
                currentMonth = month;
                data.push(profit);
                profit = 0;
            }

            profit += row.qty * row.price;
        }

        data.push(profit);

        return [{
            item: "Total sales ($)",
            data: data
        }];
        
    }

    function volumeVsTime() {
        if(!rows[0]) { return; }

        const data = [];
        var currentMonth = rows[0].date.split("-")[1];
        var volume = 0;

        for(let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const month = row.date.split("-")[1];

            if(month !== currentMonth) {
                currentMonth = month;
                data.push(volume);
                volume = 0;
            }

            volume += row.qty;
        }

        data.push(volume);

        return [{
            item: "Total sales (volume)",
            data: data
        }];
    }

    function volumeItemVsTime() {
        if(!rows[0]) { return; }
        
        const items = {};

        var currentMonth = rows[0].date.split("-")[1];
        const template = [];

        for(let i = 0; i < rows.length; ++i) {

            const row = rows[i];
            const month = row.date.split("-")[1];
            const item = row.item;
            const qty = row.qty;

            if(month !== currentMonth) {
                for(const key of Object.keys(items)) {
                    items[key]["volumes"].push(items[key]["currentVolume"]);
                    items[key]["currentVolume"] = 0;
                }

                currentMonth = month;
                template.push(0);
            }

            if(item in items) {
                items[item].currentVolume += qty;
            } else {

                items[item] = {
                    volumes: [...template],
                    currentVolume: qty
                }
            }

        }

        for(const key of Object.keys(items)) {
            items[key]["volumes"].push(items[key]["currentVolume"]);
        }

        const datas = [];

        for(const key of Object.keys(items)) {
            datas.push({
                item: key,
                data: items[key]["volumes"]
            });
        }

        return datas;
    }


    const labels = [];

    if(graph === "profit") {
        var line = salesVsTime();
    } else if(graph === "volume") {
        var line = volumeVsTime();
    } else if(graph === "itemVolume") {
        var line = volumeItemVsTime();
    } else {
        var line = null;
    }
    
    console.log(line);

    if(!line) {
        return;
    }


    for(let i = 0; i < line[0].data.length; i++) {
        labels.push("Month " + (i+1));
    }

    const datasets = line.map((entry, i) => ({
        label: entry.item,
        data: entry.data,
        // this is entirely random math. i just plugged in numbers till it spit out colors that werent entirely ugly.
        // the logic being i multiply "i" by itself a lot so that small changes in i lead to big changes in color
        // so that consecutive entries dont have super indistinguishable colors. then mod by 255, apply random offsets and hope.
        borderColor: `rgba(${4*((i+10)*(i+3)) % 255}, ${2*((i+6)*(i+1)) % 255}, ${7*((i+8)*(i+3)) % 255}, 1)` ,
        fill: false
    }));

    const data = {
        labels: labels,
        datasets: datasets
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        x: {
            ticks: {
                maxTicksLimit: 10,
                autoSkip: true,
                }
            }
        }
    };

    return (
        <>
            <ManagerNavBar/>

            <div class="manager-stats-page">

                <div class="manager-stats-graph-container">

                    <div class="manager-stats-selectors">
                        <select onChange={(e) => setGraph(e.target.value)} class="manager-stats-graph-selector">
                            <option value="profit" selected>Sales vs. Time</option>
                            <option value="volume">Volume vs. TIme</option>
                            <option value="itemVolume">Volume (by item) vs. Time</option>
                        </select>

                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>

                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>

                    <div class="manager-stats-graph">
                        <Line data={data} options={options}/>
                    </div>

                </div>
                
                <div class="manager-stats-reports-container">
                    
                    <div class="manager-stats-report-viewer">
                        
                    </div>
                    
                    <button class="manager-stats-x-report">
                        Create X Report
                    </button>

                    <button class="manager-stats-z-report">
                        Create Z Report
                    </button>

                </div>

            </div>
        </>
    );
}

export default ManagerStatsPage;