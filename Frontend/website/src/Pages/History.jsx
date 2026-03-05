import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { socket } from "../../../assets/socket"; 

export default function History() {
    const location = useLocation();
    const user = location.state; // [username, userId]
    const [boughtItems, setBoughtItems] = useState([]);

    useEffect(() => {
        if (user) {
            // 1. Ask server for the bytes
            socket.emit("fetch_history", user[1]);

            // 2. Listen for the response
            socket.on("history_data_raw", (data) => {
                setBoughtItems(data);
            });
        }

        return () => {
            socket.off("history_data_raw");
        };
    }, [user]);

    return (
        <div className="history-container">
            <h1>Purchase History</h1>
            {boughtItems.length === 0 ? (
                <p>No items bought yet.</p>
            ) : (
                <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Item Title</th>
                            <th>Price Paid</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boughtItems.map((item, index) => (
                            <tr key={index}>
                                <td>#{item.ORDER_ID}</td>
                                <td>{item.TITLE}</td>
                                <td>{item.PRICE_SUM} SEK</td>
                                <td>{item.QUANTITY}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
}