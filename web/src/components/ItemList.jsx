import ItemCard from "./ItemCard";

function ItemList({ items, esFavorito, onAgregarFavorito, onQuitarFavorito }) {
  if (!items || items.length === 0) {
    return <p className="sin-resultados">No se encontraron países.</p>;
  }

  return (
    <section className="paises" aria-label="Países encontrados">
      {items.map((pais, indice) => (
        <ItemCard
          key={
            pais.cca3 ||
            pais.codigo ||
            pais.name?.common ||
            pais.nombre ||
            `pais-${indice}`
          }
          pais={pais}
          esFavorito={esFavorito}
          onAgregarFavorito={onAgregarFavorito}
          onQuitarFavorito={onQuitarFavorito}
        />
      ))}
    </section>
  );
}

export default ItemList;