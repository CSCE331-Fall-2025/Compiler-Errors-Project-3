// Functions for making frontend communication with backend easier
// Constructing request JSONs mainly

export function addEmployee(name, role, email, phone) {
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            role,
            email,
            phone
        }),
    };

    return json;
}

export function updateEmployee(name, newName, role, email, phone) {
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            newName,
            role,
            email,
            phone
        }),
    };


    return json;
}

export function addMenuItem(name, price, ingredients) {

    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            price,
            ingredients
        }),
    };

    return json;
}

export function updateMenuItem(name, newName, price, ingredients) {

    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            newName,
            price,
            ingredients
        }),
    };

    return json;
}

export function updateInventoryItem(name, newName, qty, uprice) {

    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            newName,
            qty,
            uprice
        }),
    };

    return json;
}