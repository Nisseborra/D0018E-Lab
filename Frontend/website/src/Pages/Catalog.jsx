import { useNavigate, useLocation, useParams } from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Catalog_table from "../component/Catalog_table";

export default function Catalog() {
    const nav = useNavigate();
    const location = useLocation();
    const { id } = useParams();   // category id from URL

    const user = location.state;
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState([]);

    console.log("PAGES", user);
    console.log("Category ID from URL:", id);

    useEffect(() => {
        socket.emit("category_list");
        socket.emit("category_template", id);

        const list = (listmap) => {
            setCategories(listmap);
        };

        const template = (listmap) => {
            console.log("get templetlist:", listmap);
            setItem(listmap);
        };

        const itemadded = (item) => {
            console.log("added item:", item);
            alert(item + " added to basket");
        };

        const itemerror = (msg) => {
            console.log("itemerror");
            alert(msg);
        };

        socket.on("category_map", list);
        socket.on("template_map", template);
        socket.on("item_added", itemadded);
        socket.on("item_error", itemerror);

        return () => {
            socket.off("category_map", list);
            socket.off("template_map", template);
            socket.off("item_added", itemadded);
            socket.off("item_error", itemerror);
        };
    }, [id]);   // rerun when category changes

    function logout() {
        nav("/", { state: null });
    }

    return (
        <div>
            <div>
                <Navbar user={user} logout={logout} categories={categories} />
            </div>
            <div>
                <Catalog_table template={item} user={user} />
            </div>
        </div>
    );
}