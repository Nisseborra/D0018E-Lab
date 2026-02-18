//import produkt from "../../../../uploads/produkt.jpg";


//creating a table for each product card for the items of the category
export default function  Catalog_table({ template }) {
   return <div className="container">

   {
    template.map((template,i) => {
        return(
            <div key={i}>
            <img src={`/uploads/${template.IMAGE_1}`}  alt={`/uploads/produkt.jpg`}/>
                <h4><button>{template.TITLE}</button></h4>
                <div>
                    <span>{template.PRICE}</span>
                </div>
            </div>
        )
    })
   }
   
</div>


}