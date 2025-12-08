
import React, { useState, useEffect } from "react";


/**
 * EditableField component.
 *
 * Renders a value that can be edited inline. Displays a span when not editing
 * and an input field when editing. Supports optional formatting and parsing
 * functions.
 *
 * @component
 * @param {Object} props
 * @param {any} props.value - The current value to display/edit
 * @param {function} props.onSave - Callback function called with the new value when editing finishes
 * @param {string} [props.className] - Optional CSS class for the container
 * @param {function} [props.format] - Optional function to format the value for display
 * @param {function} [props.parse] - Optional function to parse the edited value before saving
 * @returns {JSX.Element} The rendered editable field
 */
function EditableField({ value, onSave, className, format, parse }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(
        format ? format(value) : value
    );

    useEffect(() => {
        setDraft(value);
    }, [value, format]);

    const finish = () => {
        setEditing(false);
        const parsed = parse ? parse(draft) : draft;

        if (parsed !== value && parsed != null) {
            onSave(parsed);
        }
    };

    return (
        <div className={className}>
            {editing ? (
                <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value == null ? "" : e.target.value)}
                    onBlur={finish}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") finish();
                    }}
                />
            ) : (
                <span onClick={() => setEditing(true)}>{format ? format(value) : value}</span>
            )}
        </div>
    );
}

export default EditableField;