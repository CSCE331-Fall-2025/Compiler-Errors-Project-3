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

export function updateMenuItem(name, newName, price, type, seasonal, cal) {

    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            newName,
            price,
            type,
            seasonal,
            cal
        }),
    };

    return json;
}

export function updateInventoryItem(name, newName, qty, uprice, minimum) {

    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            newName,
            qty,
            uprice,
            minimum
        }),
    };

    return json;
}

export function deleteEmployee(name){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name
        }),
    }
    return json;
}

export function deleteMenuItem(name){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name
        }),
    }
    return json;
}

export function addInventoryItem(name, qty, unit_price){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name,
            qty,
            unit_price
        }),
    }
    return json;
}

export function submitOrders(orders) {
     const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(orders)
    }
    return json;
}