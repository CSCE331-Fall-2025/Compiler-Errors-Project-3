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

export function updateEmployee(targetName, name, role, email, phone){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            targetName,
            name,
            role,
            email,
            phone
        }),
    }
    return json;
}

export function deleteEmployee(name){
    const json = {
        method: "POST",
        header: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name
        }),
    }
    return json;
}

// export function deleteMenuItem(name){
//     const json = {
//         method: "POST",
//         header: { "Content-Type": "application/json"},
//         body: JSON.stringify({
//             name
//         }),
//     }
//     return json;
// }

// export function addInventoryItem(name, qty, unit_price){
//     const json = {
//         method: "POST",
//         header: { "Content-Type": "application/json"},
//         body: JSON.stringify({
//             name,
//             qty,
//             unit_price
//         }),
//     }
//     return json;
// }