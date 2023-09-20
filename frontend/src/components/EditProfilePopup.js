import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup( {onUpdateUser, isOpen, onClose, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      nameUser: values.nameUser,
      jobUser: values.jobUser,
    });
  }

  React.useEffect(() => {
    setValues({
      nameUser: currentUser.name,
      jobUser: currentUser.about
    })
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      classNameTitle="popup__title"
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit} >

        <label className="field">
            <input
              id="name-input"
              className="popup__input"
              name="nameUser"
              type="text"
              value={values.nameUser || ''}
              placeholder="Укажите ваше имя"
              required=""
              minLength={2}
              maxLength={40}
              onChange={handleChange}
            />
            <span className="popup__input-error name-input-error" />
        </label>

        <label className="field">
            <input
              id="job-input"
              className="popup__input"
              name="jobUser"
              type="text"
              value={values.jobUser || ''}
              placeholder="Укажите вашу профессию"
              required=""
              minLength={2}
              maxLength={200}
              onChange={handleChange}
            />
            <span className="popup__input-error job-input-error" />
        </label>

    </PopupWithForm>
  );
}

export default EditProfilePopup;
