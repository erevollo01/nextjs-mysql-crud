import ProductCard from "@/componentes/ProductCard";
import axios from "axios";

// Función para cargar productos desde la API
async function loadProducts() {
  try {
    // Realiza una solicitud GET a la API para obtener los productos
    const { data } = await axios.get("http://localhost:3000/api/products");

    // Verifica si 'data' es un array de arrays
    if (Array.isArray(data) && Array.isArray(data[0])) {
      // Devuelve el primer array que contiene los productos
      return data[0];
    } else {
      // Muestra un mensaje de error si el formato de los datos es inesperado
      console.error("Unexpected data format:", data);
      return []; // Devuelve un array vacío
    }
  } catch (error) {
    // Captura y muestra cualquier error que ocurra durante la solicitud
    console.error("Error fetching products:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

// Componente que muestra la página de productos
async function ProductsPage() {
  // Llama a la función loadProducts para obtener los productos
  const products = await loadProducts();


  

  // Retorna el JSX para renderizar la página
 return (
   <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
     {products.length > 0 ? (
       products.map((product) => (
         <ProductCard product = {product} key = {product.id}/> //llamamos el componente de las tarjetas de producto
       ))
     ) : (
       <p className="text-gray-500">No products available</p>
     )}
   </div>
 );

}

export default ProductsPage;
