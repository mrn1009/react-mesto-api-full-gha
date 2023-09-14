import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, isLoading }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      userAvatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      classNameTitle="popup__title"
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit} >

        <label className="field">
            <input
              id="avatar-input"
              className="popup__input"
              name="userAvatar"
              type="url"
              placeholder="Ссылка на картинку"
              required=""
              ref={avatarRef}
            />
            <span className="popup__input-error avatar-input-error" />
        </label>

    </PopupWithForm>
  );
}

export default EditAvatarPopup;