import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isManager, setIsManager] = useState(() => {
        const v = localStorage.getItem("isManager");
        return v === null ? false : JSON.parse(v);
    });

    const [isCashier, setIsCashier] = useState(() => {
        const v = localStorage.getItem("isCashier");
        return v === null ? false : JSON.parse(v);
    });

    const [kitchenAccess, setKitchenAccess] = useState(() => {
        const v = localStorage.getItem("kitchenAccess");
        return v === null ? false : JSON.parse(v);
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("isManager", JSON.stringify(isManager));
    }, [isManager]);

    useEffect(() => {
        localStorage.setItem("isCashier", JSON.stringify(isCashier));
    }, [isCashier]);

    useEffect(() => {
        localStorage.setItem("kitchenAccess", JSON.stringify(kitchenAccess));
    }, [kitchenAccess]);

    const authCashier = (bool) => setIsCashier(bool);
    const authManager = (bool) => setIsManager(bool);
    const authKitchen = (bool) => setKitchenAccess(bool);

    return (
        <AuthContext.Provider value={{loaded, isCashier, isManager, kitchenAccess, authCashier, authManager, authKitchen}}>
            {children}
        </AuthContext.Provider>
    );
}
