import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { socket } from "../../../assets/socket"; 

export default function History() {
    const location = useLocation();
    const user = location.state; // [username, userId]
    const [boughtItems, setBoughtItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    function openForm() {
        document.getElementById("myForm").style.display = "block";
    }
    function closeForm() {
        document.getElementById("myForm").style.display = "none";
    }
    // emit reviw
    function review(ID) {
        
        
        const description = document.getElementById("description").value;
        const rating = document.getElementById("rating").value;
        
        socket.emit("review", {rating, description,ID, user})
    }
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
                            <th>submit review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boughtItems.map((item, index) => (
                            <tr key={index}>
                                <td>#{item.ORDER_ID}</td>
                                <td>{item.TITLE}</td>
                                <td>{item.PRICE_SUM} SEK</td>
                                <td>{item.QUANTITY}</td>
                                <td><button onClick={() => setSelectedItem(item)}>Open Form</button></td>
                            </tr>
                           
                        ))}
                    </tbody>
                </table>
                
            )}

{selectedItem && (<div className="form-popup">
        <h1>Review {selectedItem.TITLE}</h1>

        <label>Description</label>
        <input id="description" placeholder="Description" maxLength={150} />

        <br />

        <label>rating</label>
        <select id="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>

        <br />

        <button className="btn" onClick={() => review(selectedItem.ITEM_ID)}>Submit</button>
        <button className="btn cancel" onClick={() => setSelectedItem(null)}>Close</button>
    </div>
)}

            <button onClick={() => window.history.back()}>Go Back</button>
    </div>
        
    );
}