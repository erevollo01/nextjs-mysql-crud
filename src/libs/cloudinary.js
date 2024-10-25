import { v2 as cloudinary } from "cloudinary";

// Configuration cloudinary
cloudinary.config({
  cloud_name: "dl1ixv30n",
  api_key: "661724923163746",
  api_secret: "AASsUqDGrl_S2chz0UiPBNQ1GQ0", //definir en variable de entorno por seguridad
});

export default cloudinary;
