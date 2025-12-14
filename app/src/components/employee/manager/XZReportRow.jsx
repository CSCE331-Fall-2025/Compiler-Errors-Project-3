import React from "react";
import "../../../css/style.css";

function ReportRow({ hour, value }) {
    const ampm = hour > 11 ? "PM" : "AM";
    const real = hour % 12 === 0 ? 12 : hour % 12;

    return (
        <div className="xz-report-row">
            <div className="xz-report-row-hour">
                {`Hour: ${real}:00 ${ampm}`}
            </div>
            <div className="xz-report-row-value">
                {`Sales: ${value}`}
            </div>
        </div>
    );
}

export default ReportRow;
