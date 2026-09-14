import { Link } from "react-router-dom";
import "../styles/Header.css";
function Header() {
  return (
    <header className="header">
      <h1>Explorador de Países</h1>
      <h2>Busca datos sobre culquier país</h2>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>
    </header>
  );
}

export default Header;