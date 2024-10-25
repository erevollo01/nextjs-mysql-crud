import { writeFile } from "fs/promises";
import path from "path";


export async function processImage(image) {
  //Buffer convierte la ruta de la imagen en un objeto de una lista representado en bytes
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //ruta del archivo guarda el dato de la imagen y la guarda en public
  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);

  return filePath;
}
