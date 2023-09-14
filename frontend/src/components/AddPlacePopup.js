import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  React.useEffect(() => {
    setValues({
      name: '',
      link: ''
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      classNameTitle="popup__title"
      buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit} >

        <label className="field">
            <input
              id="place-input"
              className="popup__input"
              name="name"
              type="text"
              placeholder="Название"
              required=""
              minLength={2}
              maxLength={30}
              value={values.name || ""}
              onChange={handleChange}
            />
            <span className="popup__input-error place-input-error" />
        </label>

        <label className="field">
            <input
              id="link-input"
              className="popup__input"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required=""
              value={values.link || ""}
              onChange={handleChange}
            />
            <span className="popup__input-error link-input-error" />
        </label>

    </PopupWithForm>
  );
}

export default AddPlacePopup ;