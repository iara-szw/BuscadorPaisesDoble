import axios from "axios";

const BASE_URL = "https://api.restcountries.com/countries/v5";

const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY;

const cliente = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Adapta el objeto "nuevo" (v5) a la forma que ya usan ItemCard/ItemList/Favorites,
// así no hace falta tocar esos componentes.
const normalizarPais = (pais) => ({
  ...pais,
  nombre: pais.names?.common ?? "Sin nombre",
  bandera: pais.flag?.url_svg || pais.flag?.url_png || "",
  region: pais.region ?? "Sin región",
  capital: pais.capitals?.[0]?.name ?? "Sin capital",
  poblacion: pais.population ?? 0,
  codigo: pais.codes?.alpha_3 ?? "",
  // Compatibilidad con el shape viejo que espera name.common, flags.svg, cca3, capital[0]
  name: { common: pais.names?.common ?? "Sin nombre" },
  flags: { svg: pais.flag?.url_svg, png: pais.flag?.url_png },
  cca3: pais.codes?.alpha_3 ?? "",
  population: pais.population ?? 0,
});

// El endpoint /all ya no existe en v5: la lista se pagina (máx 100 por página en plan free).
// Traemos todo iterando el offset hasta que meta.more sea false.
export const obtenerPaises = async () => {
  const LIMITE = 100;
  let offset = 0;
  let todos = [];
  let hayMas = true;

  while (hayMas) {
    const response = await cliente.get("", {
      params: { limit: LIMITE, offset },
    });

    const { objects, meta } = response.data.data;
    todos = todos.concat(objects);
    hayMas = meta.more;
    offset += LIMITE;
  }

  return todos.map(normalizarPais);
};

// Búsqueda por nombre usando el "aggregate" name, que busca en
// names.common / names.official / names.alternates / names.native
export const obtenerPaisNombre = async (nombre) => {
  const termino = nombre.trim();

  if (!termino) {
    return [];
  }

  try {
    const response = await cliente.get("/name", {
      params: { q: termino },
    });

    return response.data.data.objects.map(normalizarPais);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }

    throw error;
  }
};

export default axios;