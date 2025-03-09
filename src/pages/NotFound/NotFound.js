import React from "react";
import "./NotFound.css";
import ghost from "../../assets/ghost.webp";

function NotFound() {
    return (
        <div className="not-found">
            <img src={ghost} alt="Ghost" />

            <h1><span>Error 404</span>: Página no encontrada</h1>
        </div>
    );
}

export default NotFound;