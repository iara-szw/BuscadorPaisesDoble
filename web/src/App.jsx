import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos";

function App() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem("favoritos") || "[]");
      return Array.isArray(guardados) ? guardados : [];
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (pais) => {
    setFavoritos((favoritosActuales) => {
      const yaExiste = favoritosActuales.some(
        (favorito) => favorito.name?.common === pais.name?.common
      );

      if (yaExiste) {
        return favoritosActuales;
      }

      return [...favoritosActuales, pais];
    });
  };

  const quitarFavorito = (nombrePais) => {
    setFavoritos((favoritosActuales) =>
      favoritosActuales.filter(
        (favorito) => favorito.name?.common !== nombrePais
      )
    );
  };

  const esFavorito = (nombrePais) =>
    favoritos.some((favorito) => favorito.name?.common === nombrePais);

  return (
    <div className="app">
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              favoritos={favoritos}
              agregarFavorito={agregarFavorito}
              quitarFavorito={quitarFavorito}
              esFavorito={esFavorito}
            />
          }
        />
        <Route
          path="/favoritos"
          element={
            <Favoritos
              favoritos={favoritos}
              quitarFavorito={quitarFavorito}
              esFavorito={esFavorito}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;