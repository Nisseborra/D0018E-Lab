
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Startmenu from './Pages/startmenu.jsx'
import Loggin from "./Pages/login.jsx";
import Signup from "./Pages/Signup.jsx";
import Item from "./Pages/Item.jsx";
import Homemenu from "./Pages/homemenu.jsx";

export default function app(){

    return(
        <BrowserRouter>
            <Routes>
                       <Route path ="/" element={<Startmenu></Startmenu>}></Route>
                        <Route path ="/loggin" element={<Loggin></Loggin>}></Route>
                        <Route path ="/signup" element={<Signup></Signup>}></Route>
                        <Route path ="/item" element={<Item></Item>}></Route>
                        <Route path="/home" element={<Homemenu></Homemenu>}></Route>

            </Routes>
        
        
        </BrowserRouter>
    )
    
}