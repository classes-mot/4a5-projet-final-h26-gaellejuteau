import { useState } from "react";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />}
      {drawerIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <header className="main-header">
        <h1 className="main-header__title">Gâteaux+</h1>
        <nav className="main-header__nav">
          <NavLinks />
        </nav>
        <button
          className="main-header__menu-btn"
          onClick={() => setDrawerIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
};
export default MainNavigation;
