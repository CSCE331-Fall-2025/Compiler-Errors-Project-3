
import React, { useState, useEffect } from "react";

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