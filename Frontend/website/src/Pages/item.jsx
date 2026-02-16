import { useNavigate} from "react-router-dom";
import { socket } from "../../../assets/socket";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function item(){
    const nav = useNavigate();
    const location = useLocation();
    const user = location.state;
    console.log(location);
    

    useEffect(()=> {
        const onUploaded = (msg) => {
        alert(msg);
        nav("/home")            
        }


        socket.on("item_uploaded", onUploaded)
        return () => {
           socket.off("item_uploaded", onUploaded)
        
    };
    },[]);

    function item(params) {
        const title = document.getElementById('title').value;
        const image_1 = document.getElementById('imageUpload1').value;
        const image_2 = document.getElementById('imageUpload2').value;
        const image_3 = document.getElementById('imageUpload3').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const id = user[1];
        if((title|| description|| price) === ""){
            alert("fill out all the field")
            return;
        }
        
        socket.emit("item", ({title,image_1,image_2,image_3,description,price,id}))
    }





    return(
        <div >
            <h1>
                Create Advertisement
            </h1>

            <div>
                
                    <b>Choose an image to upload:</b><br />
                    <input type="file" id="imageUpload1" name="image_1" accept="image/*"></input>
                    <br />
                    <input type="file" id="imageUpload2" name="image_2" accept="image/*"></input>
                    <br />
                    <input type="file" id="imageUpload3" name="image_3" accept="image/*"></input>
                    
                    <br />
                    <b>Titel </b> 
                    <input id="title" placeholder="Title"></input> 
                    
                    <br/>
                    <b> Description</b>
                    <input id="description" placeholder=""></input> 
                    
                    <br />
                    <label >Choose a Category:</label>
                    <select name="Category" id="Category">
                        <option value="Clothes">Clothes</option>
                        <option value="Books">Books</option>
                        <option value="Sports">sports & leisure</option>
                        <option value="Music">Music</option>
                    </select><br />

                    <b>Price:</b>
                    <input id="price" type="number" min="1"></input> <br />
                    
                    <button onClick={()=>nav("/home")}>back</button>
                    <button onClick={item} type="submit">Upload</button>
                   
               
            </div>
        </div>
    )
}