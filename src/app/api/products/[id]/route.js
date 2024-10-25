import { NextResponse } from "next/server";
import { conn } from "@/libs/db";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import {unlink} from "fs/promises";

export async function GET(request, { params }) {
  // Extraer el id del parámetro
  const { id } = params;

  // Ejecutar la consulta con el id extraído
  try {
    const [result] = await conn.query(
      "SELECT * FROM productjodie WHERE id = ?",
      [id]
    );

    if (result.length == 0){
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status : 404,
        }
      );
    }
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    return NextResponse.json(
      { message: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request,{ params }) {
  try {
    const result = await conn.query("DELETE FROM productjodie WHERE id= ?", [
      params.id,
    ]);

     if (result.affectedRows == 0){
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status : 404,
        }
      );

    } 
      return new Response(null, {
        status: 204,
      });
  
    } catch (error) {
      return NextResponse.json(
       { message: "Error al eliminar producto" },
       { status: 500 }
     );
  }
}


export async function PUT(request, {params}) {
  try {
    const data = await request.formData();
    const image = data.get('image');
    const updatedData =  {
        name: data.get("name"),
        price: data.get("price"),
        description: data.get("description"),

      }
    

    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status:400,
        }
      );
    }

    if (image) {
      const filePath = await processImage(image);
      const res = await cloudinary.uploader.upload(filePath);
      updatedData.image = res.secure_url

      //eliminar la imagen de public apenas suba a cloudinary
      if (res) {
        try {
          await unlink(filePath);

        } catch (unlinkError) {
          console.warn("No se pudo eliminar el archivo local:", unlinkError);
        }
      }
    }

    const result = await conn.query("UPDATE productjodie SET ? WHERE id = ?", [
      updatedData,
      params.id,
    ]);

    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProduct = await conn.query(
      "SELECT * FROM productjodie WHERE id = ?",
      [params.id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}