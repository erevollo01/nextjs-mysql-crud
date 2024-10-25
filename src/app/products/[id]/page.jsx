import React from "react";
import axios from "axios";
import Buttons from "./Buttons";

async function LoadProduct(productId){
   const {data} = await axios.get
   ('http://localhost:3000/api/products/' + productId);

   return data[0]; //soluciona el problema de doble array accediendo al primer elemento 
}

async function ProductPage({params}){

    const product = await LoadProduct(params.id);
    console.log(product)

    
     return (
       <section className="flex justify-center items-center h-screen]">
         <div className="bg-white text-black py-6 px-9 max-w-md w-full">
           {/* Ajusta el tamaño de la imagen */}
           <img
             src={product.image}
             className="w-full h-67 object-contain py-2"
             alt={product.name}
           />
           <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
           <h4 className="text-3xl font-bold">{product.price}</h4>
           <p className="text-slate-700">{product.description}</p>
           <Buttons productId={product.id} />
         </div>
       </section>
     );
    
}

export default ProductPage