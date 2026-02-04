import { useNavigate} from "react-router-dom";
export default function item(){
    const nav = useNavigate();
    return(
        <div >
            <h1>
                Create Advertisement
            </h1>

            <div>
                <form  name="" action="" method="get">
                    <b>Choose an image to upload:</b><br />
                    <input type="file" id="imageUpload" name="image" accept="image/*"></input>
                    <br />
                    <input type="file" id="imageUpload" name="image_2" accept="image/*"></input>
                    <br />
                    <input type="file" id="imageUpload" name="image_3" accept="image/*"></input>
                    <br />
                    <b>Titel </b> 
                    <input  placeholder="Title"></input> 
                    <br/>
                    <b> Description</b>
                    <input  placeholder=""></input> 
                    <br />
                    <label >Choose a Category:</label>
                    <select name="Category" id="Category">
                    <option value="Clothes">Clothes</option>
                    <option value="Books">Books</option>
                    <option value="Sports">sports & leisure</option>
                    <option value="Music">Music</option>
                    </select><br />

                    <b>Price:</b>
                    <input  type="number" min="1"></input> <br />

                    <button>Loggin</button>
                    <button onClick={()=>nav("/")}>back</button>
                </form>
            </div>
        </div>
    )
}