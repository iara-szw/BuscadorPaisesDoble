import ItemList from "../components/ItemList";

function Favorites({ favoritos, quitarFavorito, esFavorito }) {
  return (
    <section className="page favorites-page">
      <h2>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="status-message">
          Todavía no agregaste ningún favorito.
        </p>
      ) : (
        <ItemList
          items={favoritos}
          esFavorito={esFavorito}
          onAgregarFavorito={() => {}}
          onQuitarFavorito={quitarFavorito}
        />
      )}
    </section>
  );
}

export default Favorites;