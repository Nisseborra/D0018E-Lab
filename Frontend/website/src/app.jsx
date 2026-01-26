
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Startmenu from './Pages/startmenu.jsx'

export default function app(){

    return(
        <BrowserRouter>
            <Routes>
                       <Route path ="/" element={<Startmenu></Startmenu>}></Route>

            </Routes>
        
        
        </BrowserRouter>
    )
    
}