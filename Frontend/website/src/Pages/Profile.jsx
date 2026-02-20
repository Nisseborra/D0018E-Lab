import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { socket } from "../../../assets/socket"; 

export function Profile() {
    const location = useLocation();
    const user = location.state; 
    const [data, setData] = useState(null);
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        socket.on("profile_data", (payload) => setData(payload));
        if (user) socket.emit("profile", user[1]);
        
        return () => socket.off("profile_data");
    }, [user]);

    if (!data) return <h1>Loading...</h1>;

    return (
        /* The Wrapper: Centers everything on the screen */
        <div style={{ 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "100vh", // Take up full screen height
            color: "white",
            textAlign: "center" 
        }}>
            <div style={{ border: "1px solid #444", padding: "40px", borderRadius: "10px", background: "#1a1a1a" }}>
                <h2>Account Details</h2>
                
                <p><strong>Username:</strong> {data.USERNAME}</p>
                
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    <label>Password:</label>
                    <input 
                        type={showPass ? "text" : "password"} 
                        value={data.PASSWORD} 
                        readOnly 
                        style={{ background: "transparent", color: "white", border: "none", width: "100px", textAlign: "center" }}
                    />
                </div>

                <button 
                    onClick={() => setShowPass(!showPass)}
                    style={{ marginTop: "20px", padding: "8px 16px", cursor: "pointer" }}
                >
                    {showPass ? "Hide" : "Show Password"}
                </button>
            </div>
        </div>
    );
}