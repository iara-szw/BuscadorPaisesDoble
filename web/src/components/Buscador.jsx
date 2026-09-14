import "../styles/Buscador.css";
function Buscador({ textoBusqueda, setTextoBusqueda }) {
	return (
		<form className="buscador" onSubmit={(event) => event.preventDefault()}>
			<input
				id="buscar-pais"
				type="search"
				value={textoBusqueda}
				onChange={(event) => setTextoBusqueda(event.target.value)}
				placeholder="Ej. México, Japón o España"
				autoComplete="off"
			/>
		</form>
	);
}

export default Buscador;
