function ItemCard({ pais, esFavorito, onAgregarFavorito, onQuitarFavorito }) {
  const nombre = pais.name?.common ?? pais.nombre ?? "Sin nombre";
  const bandera = pais.flags?.svg ?? pais.flag ?? pais.bandera ?? "";
  const capital = Array.isArray(pais.capital)
    ? pais.capital[0] ?? "Sin capital"
    : pais.capital || "Sin capital";
  const region = pais.region ?? "Sin región";
  const poblacion = new Intl.NumberFormat("es-AR").format(
    pais.population ?? pais.poblacion ?? 0
  );
  const esPaisFavorito = esFavorito ? esFavorito(nombre) : false;

  return (
    <article className="item-card">
      <div className="card-flag-wrap">
        {bandera ? (
          <img
            src={bandera}
            alt={`Bandera de ${nombre}`}
            className="card-image"
          />
        ) : (
          <div className="card-image placeholder">🌍</div>
        )}
      </div>

      <div className="card-body">
        <h3>{nombre}</h3>
        <p>
          <strong>Región:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
        <p>
          <strong>Población:</strong> {poblacion}
        </p>

        <button
          type="button"
          className={`favorite-button ${esPaisFavorito ? "is-favorite" : ""}`}
          onClick={() => {
            if (esPaisFavorito) {
              onQuitarFavorito?.(nombre);
              return;
            }

            onAgregarFavorito?.(pais);
          }}
        >
          {esPaisFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}

export default ItemCard;