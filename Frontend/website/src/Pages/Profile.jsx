import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { socket } from "../../../assets/socket"; 

const styles = {
    container: { maxWidth: "900px", margin: "40px auto", padding: "20px", color: "white", fontFamily: "sans-serif" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" },
    section: { border: "1px solid #333", borderRadius: "8px", background: "#111", overflow: "hidden", marginBottom: "20px" },
    header: { background: "#222", padding: "12px 15px", fontWeight: "bold", borderBottom: "1px solid #333" },
    content: { padding: "20px", display: "flex", flexDirection: "column", gap: "10px" },
    label: { fontSize: "11px", color: "#888", fontWeight: "bold" },
    value: { fontSize: "18px", color: "#fff", marginBottom: "15px", borderBottom: "1px solid #222", paddingBottom: "5px" },
    input: { padding: "12px", background: "#1a1a1a", border: "1px solid #444", borderRadius: "4px", color: "white", marginBottom: "10px" },
    btn: { background: "#0056b3", color: "white", padding: "12px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "bold" },
    successMsg: { color: "#00ff00", fontSize: "12px", marginBottom: "10px", textAlign: "center" }
};

export function Profile() {
    const location = useLocation();
    const user = location.state; 
    const [data, setData] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");

    // Local states for the password change form
    const [oldPassInput, setOldPassInput] = useState("");
    const [newPassInput, setNewPassInput] = useState("");

    useEffect(() => {
        // --- DATA INBOUND ---
        socket.on("profile_data", (payload) => setData(payload));
        
        // --- UPDATE CONFIRMATION ---
        socket.on("update_success", (msg) => {
            setStatusMsg(msg);
            // Refresh local data so the new password is in RAM for next check
            if (user) socket.emit("profile", user[1]);
            // Clear message after 3 seconds
            setTimeout(() => setStatusMsg(""), 3000);
        });

        if (user) socket.emit("profile", user[1]);
        
        return () => {
            socket.off("profile_data");
            socket.off("update_success");
        };
    }, [user]);

    const handlePasswordUpdate = () => {
        // Step 1: Compare input bytes to database bytes already in RAM
        if (oldPassInput !== data.PASSWORD) {
            alert("Incorrect current password!");
            return;
        }

        if (newPassInput.length < 1) {
            alert("New password cannot be empty");
            return;
        }

        // Step 2: Verification passed, emit the bytes to the backend
        socket.emit("update_password", { 
            userId: data.USER_ID, 
            newPassword: newPassInput 
        });
        
        setOldPassInput("");
        setNewPassInput("");
    };

    if (!data) return <h1 style={{ textAlign: "center", color: "white" }}>Loading...</h1>;

    return (
        <div style={styles.container}>
            <h1>Profile Settings</h1>
            <div style={styles.grid}>
                {/* Column 1: Personal Data Display */}
                <div>
                    <div style={styles.section}>
                        <div style={styles.header}>Identity</div>
                        <div style={styles.content}>
                            <span style={styles.label}>Username</span>
                            <div style={styles.value}>{data.USERNAME}</div>
                            
                            <span style={styles.label}>First Name</span>
                            <div style={styles.value}>{data.FNAME}</div>
                            
                            <span style={styles.label}>Last Name</span>
                            <div style={styles.value}>{data.LNAME}</div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Password Change Form */}
                <div>
                    <div style={styles.section}>
                        <div style={styles.header}>Security Settings</div>
                        <div style={styles.content}>
                            {statusMsg && <div style={styles.successMsg}>{statusMsg}</div>}
                            
                            <label style={styles.label}>Verify Current Password</label>
                            <input 
                                type="password" 
                                style={styles.input} 
                                value={oldPassInput}
                                onChange={(e) => setOldPassInput(e.target.value)}
                            />

                            <label style={styles.label}>Set New Password</label>
                            <input 
                                type="password" 
                                style={styles.input} 
                                value={newPassInput}
                                onChange={(e) => setNewPassInput(e.target.value)}
                            />

                            <button style={styles.btn} onClick={handlePasswordUpdate}>
                                Commit Password Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}