-- Eliminar la tabla si ya existe (opcional, solo si quieres reiniciar la tabla)
DROP TABLE IF EXISTS productEnrique;

-- Crear la tabla
CREATE TABLE productEnrique (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200),
    price DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agregar la columna 'image' si no existe
-- Nota: MySQL no soporta `IF NOT EXISTS` directamente para columnas
-- Por lo tanto, si quieres evitar errores cuando la columna ya existe, deberás manejarlo en tu lógica de aplicación.
ALTER TABLE productEnrique 
ADD COLUMN image VARCHAR(200) AFTER description;
