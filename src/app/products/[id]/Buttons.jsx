"use client"
import axios from "axios";
import { useRouter } from "next/navigation";


function Buttons({productId}){

    const router = useRouter();

    return (
      <div className="flex gap-x-2 mt-3">
        <button className=
        "bg-orange-500 hover:bg-red-700 py-2 px-3 rounded"
        onClick={async()=>{
            if (confirm('Are you sure you want to delete this product?')){
                const res = await axios.delete('/api/products/' + productId)
                if (res.status == 204){ //si status es 204 redirigirme a products
                    router.push('/products')
                    router.refresh()// actualiza la página después de eliminar los datos
                }
            }
        }}
        >
          Delete
        </button>
        <button 
        className="bg-gray-500 hover:bg-green-700 py-2 px3 rounded"
        onClick={()=>{
            router.push(`/products/edit/${productId}`);
        }}
        >
          Edit
        </button>
      </div>
    );
}

export default Buttons