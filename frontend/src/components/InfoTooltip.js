import React from "react";


function InfoTooltip ({ isOpen, imgResAuth, textResAuth, onClose }) {
  return (
    <div className={`popup ${isOpen ? `popup_opened`: ""}`} >
        <div className="popup__container">
          <img className="autorize__res-img"
            src={imgResAuth}
            alt={textResAuth}
          />
          <h2 className="autorize__res-text">{textResAuth}</h2>
          <button
            className="popup__closed link-hover"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </div>
    </div>
  );
}

export default InfoTooltip ;