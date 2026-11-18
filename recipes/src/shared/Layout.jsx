import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="columns is-gapless is-marginless app-layout">
      <aside className="column is-12-mobile is-3-tablet is-2-desktop sidebar">
        <h1 className="title is-4 has-text-white">Mes recettes</h1>

        <nav className="menu">
          <p className="menu-label">Navigation</p>
          <ul className="menu-list">
            <li>
              <NavLink to="/" end>
                Accueil
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="column main-content">
        <div className="section">
          <Outlet />
        </div>
      </main>
    </div>
  );
}