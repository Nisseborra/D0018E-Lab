
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Startmenu from './Pages/startmenu.jsx'
import Loggin from "./Pages/login.jsx";
import Signup from "./Pages/Signup.jsx";
import Item from "./Pages/item.jsx";
import Homemenu from "./Pages/homemenu.jsx";
import Selling from "./Pages/Selling.jsx";
import Catalog from "./Pages/catalog.jsx";
import Basket from "./Pages/Basket.jsx";
import ItemCard from "./Pages/ItemCard.jsx";
import { Profile } from "./Pages/profile.jsx";
import Admin from "./Pages/admin.jsx";
import History from "./Pages/History.jsx";
export default function app(){

    return(
        <BrowserRouter>
            <Routes>
                       <Route path ="/" element={<Startmenu></Startmenu>}></Route>
                        <Route path ="/loggin" element={<Loggin></Loggin>}></Route>
                        <Route path ="/signup" element={<Signup></Signup>}></Route>
                        <Route path ="/item" element={<Item></Item>}></Route>
                        <Route path="/home" element={<Homemenu></Homemenu>}></Route>
                        <Route path="/selling" element={<Selling></Selling>}></Route>
                        <Route path="/catalog" element={<Catalog></Catalog>}></Route>
                        <Route path="/basket" element={<Basket></Basket>}></Route>
                        <Route path="/ItemCard" element={<ItemCard></ItemCard>}></Route>
                        <Route path="/Profile" element={<Profile></Profile>}></Route>
                        <Route path="/ADMIN" element ={<Admin></Admin>}></Route>
                        <Route path="/History" element={<History></History>} ></Route>
                        


            </Routes>
        
        
        </BrowserRouter>
    )
    
}