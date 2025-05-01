import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
            setChecking(false);
        } else {
            swal.fire({
                icon: "error",
                title: "Acceso denegado",
                text: "Debes iniciar sesión para acceder a esta página",
            }).then(() => {
                setIsAuthenticated(false);
                navigate("/");
            })
        }
    }, [navigate]);

    if (checking) {
        return null;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
