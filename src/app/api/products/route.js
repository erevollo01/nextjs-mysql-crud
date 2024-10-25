import { NextResponse } from "next/server";
import { conn } from "@/libs/db";
import { unlink} from 'fs/promises';
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM productjodie");
        console.log("Results:", results); 
        return NextResponse.json(results);
        

        }catch (error){
         return NextResponse.json(
          {
            message: error.message,
         },
         {
            status:500,
         }
        );
     }
    }



export async function POST(request) {
  try {
    const data = await request.formData();
    const name = data.get("name");
    const description = data.get("description");
    const price = data.get("price");
    const image = data.get("image");

    // Verifica si los campos necesarios están presentes
    if (!name || !description || !price || !image) {
      return NextResponse.json(
        {
          message:
            "Todos los campos (name, description, price, image) son requeridos.",
        },
        { status: 400 }
      );
    }
    
   const filePath = await processImage(image);
   
   const res = await cloudinary.uploader.upload(filePath);
   console.log(res);

   //eliminar la imagen de public apenas suba a cloudinary
   if (res) {
     try {
       await unlink(filePath);
     } catch (unlinkError) {
       console.warn("No se pudo eliminar el archivo local:", unlinkError);
     }
   }

    // Realiza la inserción de datos en la base de datos
    const [result] = await conn.query("INSERT INTO productjodie SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: res.secure_url,
    });

    // Retorna la respuesta con el id insertado y los demás datos
    return NextResponse.json({
      id: result.insertId, // Captura correcta del ID generado
      name,
      description,
      price,
    });
  } catch (error) {
    // Muestra el error en la consola con detalles
    console.error("Error durante la inserción de datos:", error.message);
    console.error("Detalles completos del error:", error);

    // Retorna una respuesta con el mensaje de error y un código de estado 500
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
