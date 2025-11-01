import { readFile, writeFile } from "fs/promises";

export const leerArchivo = async (ruta) => {
  const data = await readFile(ruta, "utf-8");
  return JSON.parse(data);
};

export const escribirArchivo = async (ruta, contenido) => {
  await writeFile(ruta, JSON.stringify(contenido, null, 2), "utf-8");
};
