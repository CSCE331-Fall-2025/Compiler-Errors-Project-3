import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

/**
 * AuthProvider
 *
 * Provides global authentication/role state for the app:
 * - Manager access
 * - Cashier access
 * - Kitchen access
 * - Loaded flag (ensures initial localStorage hydration)
 *
 * All state values are persisted in localStorage.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by the provider.
 * @returns {JSX.Element} The authentication context provider.
 */
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

    const [zReport, setZReport] = useState(true);

    const [loaded, setLoaded] = useState(false);

    /** Set loaded = true on first mount */
    useEffect(() => {
        setLoaded(true);
    }, []);

    /** Persist manager access state */
    useEffect(() => {
        localStorage.setItem("isManager", JSON.stringify(isManager));
    }, [isManager]);

    /** Persist cashier access state */
    useEffect(() => {
        localStorage.setItem("isCashier", JSON.stringify(isCashier));
    }, [isCashier]);

    /** Persist kitchen access state */
    useEffect(() => {
        localStorage.setItem("kitchenAccess", JSON.stringify(kitchenAccess));
    }, [kitchenAccess]);

    const authCashier = (bool) => setIsCashier(bool);

    const authManager = (bool) => setIsManager(bool);

    const authKitchen = (bool) => setKitchenAccess(bool);

    const disableZReport = () => setZReport(false);

    return (
        <AuthContext.Provider
            value={{
                loaded,
                isCashier,
                isManager,
                kitchenAccess,
                zReport,
                authCashier,
                authManager,
                authKitchen,
                disableZReport
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}