import React from "react";
import logo from '../images/logo.svg';
import { Link } from "react-router-dom";

function Header({onClick, email, title, link, loggedIn}) {
  const [isMenuMobile, setIsMenuMobile] = React.useState(false);

  function handleOpenMenuMobile() {
    setIsMenuMobile(true)
  }

  function closeMenuMobile() {
    setIsMenuMobile(false)
  }

  return (
    <>
      {loggedIn && (
        <div className={`${isMenuMobile ? "autorize__wrapper_opened": "autorize__wrapper"}`}>
            <div className="autorize__mobile">
                <span className="autorize__email">{email}</span>
                <Link to={link} onClick={onClick} className="autorize__exit link-hover">{title}</Link>
            </div>
        </div>
      )}

      <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Изображение логотипа"
        />

        <div className={`${loggedIn ? "autorize" : ""}`}>
          <span className="autorize__email">{email}</span>
            <Link to={link} onClick={onClick} className="autorize__entry link-hover">{title}</Link>
        </div>

        {loggedIn && (
          <>
            <button onClick={handleOpenMenuMobile} className={`${isMenuMobile ? "menu-mobile_disactive": "menu-mobile link-hover"}`}>
              <hr className="menu-mobile__line"></hr>
              <hr className="menu-mobile__line"></hr>
              <hr className="menu-mobile__line"></hr>
            </button>
            <button onClick={closeMenuMobile} className={`${isMenuMobile ? "autorize__closed": "autorize__closed_disactive"}`}>
            </button>
          </>
        )}

      </header>
    </>
  )
}

export default Header;