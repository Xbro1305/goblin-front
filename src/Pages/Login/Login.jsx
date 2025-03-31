import react from "react";
import styles from "./Login.module.scss";
import { Input } from "../../Components/Input/Input";
import { CiLock, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(`${baseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={`header-30 ${styles.loginTitle}`}>Вход</h1>
        <p className="text-16">
          Подзаголовок, который раскрывает подробности и детали заголовка
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
          <Input
            onChange={(value) => setEmail(value)}
            value={email}
            placeholder={
              <p>
                <CiUser /> Логин
              </p>
            }
          />
          <Input
            onChange={(value) => setPassword(value)}
            value={password}
            placeholder={
              <p>
                <CiLock /> Пароль
              </p>
            }
          />
          <Link to="/reset-pass" className="link">
            Забыли пароль?
          </Link>
          <button type="submit" className="green-button">
            Войти
          </button>
          <Link to="/signin" className="link">
            Нет аккаунта? <u>Зарегистрироваться</u>
          </Link>
        </form>
      </div>
    </div>
  );
};
