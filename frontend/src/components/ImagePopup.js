import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ isOpen, card, onClose}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup view ${isOpen ? `popup_opened`: ""}`}>
        <div className="view__wrapper">
          <img className="view__photo" src={card ? card.link : ""} alt={card ? card.name : ""} />
          <h2 className="view__caption">{card ? card.name : ""}</h2>
          <button
            className="popup__closed link-hover"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          />
        </div>
      </div>
  )
}

export default ImagePopup;