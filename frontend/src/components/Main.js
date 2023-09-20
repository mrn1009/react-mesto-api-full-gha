import React from "react"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">

        <div className="profile__user">

          <div className="profile__avatar-group" >
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
            <button
              className="profile__avatar-edit"
              onClick={onEditAvatar} />
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button link-hover"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile} />
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>

        </div>

        <button
          className="profile__add-button link-hover"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace} />

      </section>

      {/* карточки */}
      <section className="elements">
        {cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card} />
          ))}
      </section>

    </main>
  )
}

export default Main;
