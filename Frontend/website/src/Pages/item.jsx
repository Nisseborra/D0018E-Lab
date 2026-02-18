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
        const image_1 = document.getElementById('imageUpload1').files[0];
        const image_2 = document.getElementById('imageUpload2').files[0];
        const image_3 = document.getElementById('imageUpload3').files[0];
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const id = user[1];
        if((title|| description|| price || image_1) === ""){
            alert("fill out all the field")
            return;
        }
        
       
    }





    return(
        <div >
            <h1>
                Create Advertisement
            </h1>

            <div>
                <form action="http://localhost:3000/upload" method="post" encType="multipart/form-data">   
                    <b>Choose an image to upload:</b><br />
                    <input type="file" id="imageUpload1" name="image_1" accept="image/jpeg,image/png,image/jpg"></input>
                
                    <br />
                    <input type="file" id="imageUpload2" name="image_2" accept="image/jpeg,image/png,image/jpg"></input>
                    <br />
                    <input type="file" id="imageUpload3" name="image_3" accept="image/jpeg,image/png,image/jpg"></input>
                    
                    <br />
                    <b>Titel </b> 
                    <input id="title" placeholder="Title" name="title"></input> 
                    
                    <br/>
                    <b> Description</b>
                    <input id="description" placeholder="" name="description"></input> 
                    
                    <br />
                    <label >Choose a Category:</label>
                    <select name="Category" id="Category">
                        <option value="Clothes">Clothes</option>
                        <option value="Books">Books</option>
                        <option value="Sports">sports & leisure</option>
                        <option value="Music">Music</option>
                    </select><br />

                    <b>Price:</b>
                    <input id="price" type="number" min="1" name="price"></input> <br />
                    <input type="hidden" name="userId" value={user[1]} />
                    <button onClick={()=>nav("/home",{state: user})}>back</button>
                    <button  type="submit"  name="" onclick="item()">Upload</button>
                </form>   
               
            </div>
        </div>
    )
}