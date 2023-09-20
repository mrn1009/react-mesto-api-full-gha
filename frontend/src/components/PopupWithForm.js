import React from "react";
import usePopupClose from "../hooks/usePopupClose";

function PopupWithForm({isOpen, onClose, title, classNameTitle, buttonTitle, children, onSubmit}) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? `popup_opened`: ""}`} >
      <div className="popup__container">
        <form
          onSubmit={onSubmit}
        >
          <h2 className={classNameTitle}>{title}</h2>
          {children}
          <button className="popup__button" type="submit" aria-label="Сохранить">
            {buttonTitle}
          </button>
        </form>
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

export default PopupWithForm;
