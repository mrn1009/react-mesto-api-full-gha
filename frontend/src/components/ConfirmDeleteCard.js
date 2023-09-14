import React from 'react';
import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';

function ConfirmDeleteCard({ isOpen, onClose, isLoading, onDeleteCard, card}) {

  usePopupClose(isOpen, onClose);

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Вы уверены?"
      classNameTitle="popup__title popup__title_deletecard"
      buttonTitle={isLoading ? 'Удаление...' : 'Да'}
      onClose={onClose}
      onSubmit={handleSubmit} />
  );
}

export default ConfirmDeleteCard;