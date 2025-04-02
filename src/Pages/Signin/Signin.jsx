import react from "react";
import styles from "../Login/Login.module.scss";
import { Input } from "../../Components/Input/Input";
import { CiLock, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from "axios";

export const Signin = () => {
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");
  const [confirmPassword, setConfirmPassword] = react.useState("");
  const [name, setName] = react.useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(`${baseUrl}/api/users/register`, {
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
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={`header-30 ${styles.loginTitle}`}>Регистрация</h1>
        <p className="text-16">
          Напишите адрес вашей электронной почты и мы отправим письмо с кодом
          для подтверждения
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
          <Input
            value={name}
            onChange={(value) => setName(value)}
            placeholder={
              <p>
                <CiUser /> Полное имя
              </p>
            }
          />
          <Input
            onChange={(value) => setEmail(value)}
            value={email}
            placeholder={
              <p>
                <MdEmail /> E-mail
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
          <Input
            onChange={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            placeholder={
              <p>
                <CiLock /> Пароль (повторите)
              </p>
            }
          />
          <button type="submit" className="green-button">
            Зарегистрироваться
          </button>
          <Link to="/login" className="link">
            Уже есть аккаунт? <u>Войти</u>
          </Link>
        </form>
      </div>
    </div>
  );
};
