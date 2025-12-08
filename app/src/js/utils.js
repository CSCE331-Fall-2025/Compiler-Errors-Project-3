/**
 * Creates a POST request payload for adding an employee.
 * @param {string} name - Employee name.
 * @param {string} role - Employee role.
 * @param {string} email - Employee email.
 * @param {string} phone - Employee phone number.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for updating an employee.
 * @param {string} name - Current employee name.
 * @param {string} newName - Updated employee name.
 * @param {string} role - Updated employee role.
 * @param {string} email - Updated employee email.
 * @param {string} phone - Updated employee phone number.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for adding a menu item.
 * @param {string} name - Menu item name.
 * @param {number} price - Menu item price.
 * @param {string[]} ingredients - Ingredient list.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for updating a menu item.
 * @param {string} name - Current menu item name.
 * @param {string} newName - Updated menu item name.
 * @param {number} price - Updated price.
 * @param {string} type - Updated type/category.
 * @param {boolean} seasonal - Whether item is seasonal.
 * @param {number} cal - Updated calorie count.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for updating an inventory item.
 * @param {string} name - Current inventory item name.
 * @param {string} newName - Updated item name.
 * @param {number} qty - Updated quantity.
 * @param {number} uprice - Updated unit price.
 * @param {number} minimum - Updated minimum stock threshold.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for deleting an employee.
 * @param {string} name - Employee name.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for deleting a menu item.
 * @param {string} name - Menu item name.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
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

/**
 * Creates a POST request payload for deleting an inventory item.
 * @param {string} name - Inventory item name.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function deleteInventoryItem(name){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name
        }),
    }
    return json;
}

/**
 * Creates a POST request payload for adding an inventory item.
 * @param {string} name - Item name.
 * @param {number} qty - Quantity.
 * @param {number} unit_price - Unit price.
 * @param {number} minimum - Minimum threshold.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function addInventoryItem(name, qty, unit_price, minimum){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name,
            qty,
            unit_price,
            minimum
        }),
    }
    return json;
}

/**
 * Creates a POST request payload for submitting multiple orders.
 * @param {Object[]} orders - Array of order objects.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function submitOrders(orders) {
     const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(orders)
    }
    return json;
}

/**
 * Creates a POST request payload for validating an employee login.
 * @param {string} username - Username.
 * @param {string} password - Password.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function validateEmployee(username, password){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            password
        }),
    }
    return json;
}

/**
 * Creates a POST request payload for validating a customer login.
 * @param {string} username - Username.
 * @param {string} password - Password.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function validateCustomer(username, password){
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            password
        }),
    }
    return json;
}

/**
 * Creates a POST request payload for requesting an ingredient list.
 * @param {string} name - Menu item name.
 * @returns {{method:string,headers:Object,body:string}} POST request config.
 */
export function fetchIngredients(name) {
    const json = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            name
        }),
    }
    return json;   
}
