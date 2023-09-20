import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCard from './ConfirmDeleteCard';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/Api";
import * as auth from '../utils/auth.js';
import success from '../images/success.svg'
import error from '../images/error.svg'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isViewPhoto, setIsViewPhoto] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = React.useState(false);
  const [isLoadingUser, setIsLoadingUser] = React.useState(false);
  const [isLoadingPlace, setIsLoadingPlace] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [imgResAuth, setImgResAuth] = React.useState("");
  const [textResAuth, setTextResAuth] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardData, data]) => {
        setCards(cardData);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
    }
  }, [loggedIn]);

  //регистрация пользователя
  function handleRegister (password, email) {
    auth.register(password, email)
      .then(() => {
        navigate("/signin", { replace: true });
        handleOpenInfoTooltip();
        setImgResAuth(success);
        setTextResAuth("Вы успешно зарегистрировались!")
      })
      .catch((err) => {
        console.log(`${err}`);
        handleOpenInfoTooltip();
        setImgResAuth(error);
        setTextResAuth("Что-то пошло не так! Попробуйте еще раз")
      })
  }

  //авторизация пользователя
  function handleLogin (password, email) {console.log(loggedIn)
    auth.authorize(password, email)
      .then(() => {
          localStorage.setItem('loggedIn', true);
          setLoggedIn(true);
          console.log(loggedIn);
          setUserEmail(email);
          navigate("/", {replace: true});
      })
      .catch((err) => {
        console.log(`${err}`);
        handleOpenInfoTooltip();
        setImgResAuth(error);
        setTextResAuth("Что-то пошло не так! Попробуйте еще раз")
      })
  }

  //проверка токена
  function checkToken () {
    if (localStorage.getItem('loggedIn')) {
      auth.checkToken()
        .then((user) => {console.log(loggedIn)
          setLoggedIn(true);
          setUserEmail(user.email);
          navigate("/", {replace: true});
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    }
  }

  React.useEffect(() => {
    checkToken()
  }, []);

  //выход
  function signOut() {
    localStorage.removeItem('loggedIn');
    navigate('/signin');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    } else {
      api.removeLike(card._id)
        .then((cardId) => {
          setCards((state) => state.map((c) => (c._id === card._id ? cardId : c)));
        })
        .catch((err) => {
          console.log(`${err}`);
      });
    }
  }

 //удаление карточки
 function handleCardDelete(card) {
  setIsLoadingConfirm(true)
  api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoadingConfirm(false)
      })
  }

  //изменение данных о пользователе
  function handleUpdateUser(data) {
    setIsLoadingUser(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingUser(false)
      })
  }

  //смена аватара
  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingAvatar(false)
      })
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    setIsLoadingPlace(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingPlace(false)
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardClick(card) {
    setIsViewPhoto(true)
    setSelectedCard(card)
  }

  function handleOpenInfoTooltip() {
    setIsInfoTooltipOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsViewPhoto(false)
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard(null)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/signin" element={
            <>
              <Header title="Регистрация" link="/signup"/>
              <Login handleLogin={handleLogin} />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Header title="Войти" link="/signin"/>
              <Register handleRegister={handleRegister} />
            </>
          } />
          <Route path="/" element={
            <>
              <Header
                onClick={signOut}
                email={userEmail}
                title="Выйти"
                link="/signup"
                loggedIn={loggedIn} />
              <ProtectedRoute element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards={cards} />
              <Footer />
            </>
          } />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signup" />} />
        </Routes>

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoadingUser} />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoadingAvatar} />
        <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoadingPlace} />
        <PopupWithForm name="deletecard" title="Вы уверены?" buttonTitle="Да" />
        <ImagePopup
            isOpen={isViewPhoto}
            onClose={closeAllPopups}
            card={selectedCard}/>
        <ConfirmDeleteCard
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            card={selectedCard}
            isLoading={isLoadingConfirm}/>
        <InfoTooltip
            isOpen ={isInfoTooltipOpen}
            imgResAuth = {imgResAuth}
            textResAuth = {textResAuth}
            onClose={closeAllPopups}/>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
