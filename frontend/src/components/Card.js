import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element" >
      <img
        className="element__photo link-hover"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
     {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick} />}
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
