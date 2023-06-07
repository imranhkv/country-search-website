import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { ThemeContext } from "../../App";

function NotFound() {
    const theme = useContext(ThemeContext);

    return (
        <div style={theme} >
            <div className="notfound-context" style={{
                display: "flex", justifyContent: "center",
                alignItems: "center", height: "100vh"
            }} >
                <div className="div">
                    <h2 style={{ fontSize: "40px", fontFamily: "Arial", fontWeight: "600", marginBottom: "30px" }}>Səhifə Tapılmadı</h2>
                    <Link to="/" style={{
                        fontSize: "25px", fontFamily: "Arial", fontWeight: "600", marginBottom: "30px",
                        color: "#fff", backgroundColor: "#000", border: "1px solid #000", padding: "10px"
                    }} >Ana Səhifəyə Qayıt</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound