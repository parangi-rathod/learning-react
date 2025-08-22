import { useState, useEffect } from 'react'

function useRole() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        try {
            const decodedToken = localStorage.getItem("decodedToken");
            if (decodedToken) {
                const parsedToken = JSON.parse(decodedToken);
                const userRole = parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setRole(userRole || null);
            }
        } catch (error) {
            console.error("Error parsing token:", error);
            setRole(null);
        }
    }, []);

    return [role, setRole];
}

export default useRole