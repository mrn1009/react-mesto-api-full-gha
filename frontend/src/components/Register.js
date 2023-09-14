import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister  }) {
  const [formValue, setFormValue] = React.useState({
    password: '',
    email: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    handleRegister (password, email)
  }

  return (
    <section className="content-autorize">
        <h2 className="autorize__title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
            <label className="field">
                <input
                  className="autorize__input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={formValue.email}
                  onChange={handleChange}
                />
                <span className="popup__input-error" />
            </label>
            <label className="field">
                <input
                  className="autorize__input"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  autoComplete="off"
                  value={formValue.password}
                  onChange={handleChange}
                />
                <span className="popup__input-error popup__input-error_autorize" />
            </label>
            <button className="autorize__button link-hover" type="submit" aria-label="Сохранить">Зарегистрироваться</button>
            <p className="autorize__text">Уже зарегистрированы? <Link to="/sign-in" className="autorize__link link-hover">Войти</Link></p>
        </form>
    </section>
  )
}

export default Register;