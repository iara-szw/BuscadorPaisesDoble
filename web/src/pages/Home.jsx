import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/Buscador";
import ItemList from "../components/ItemList";
import { obtenerPaises } from "../services/APIcontries";

function Home({ agregarFavorito, quitarFavorito, esFavorito }) {
  const [paises, setPaises] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const yaCargado = useRef(false);

  useEffect(() => {
    if (yaCargado.current) {
      return;
    }
    yaCargado.current = true;

    const buscarPaises = async () => {
      try {
        setCargando(true);
        setError(null);
        const datos = await obtenerPaises();
        setPaises(
          [...datos].sort((a, b) =>
            (a.name?.common ?? "").localeCompare(b.name?.common ?? "")
          )
        );
      } catch {
        setError("No fue posible obtener la información.");
      } finally {
        setCargando(false);
      }
    };

    buscarPaises();
  }, []);

  const paisesFiltrados = paises.filter((pais) =>
    (pais.name?.common ?? "")
      .toLocaleLowerCase()
      .includes(textoBusqueda.trim().toLocaleLowerCase())
  );

  return (
    <main className="inicio">
      <SearchBar
        textoBusqueda={textoBusqueda}
        setTextoBusqueda={setTextoBusqueda}
      />

      {cargando && <p>Cargando información...</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && paisesFiltrados.length === 0 && (
        <p>No encontramos resultados.</p>
      )}

      {!cargando && !error && paisesFiltrados.length > 0 && (
        <ItemList
          items={paisesFiltrados}
          esFavorito={esFavorito}
          onAgregarFavorito={agregarFavorito}
          onQuitarFavorito={quitarFavorito}
        />
      )}
    </main>
  );
}

export default Home; 