import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import goblin from "../../assets/images/Гоблин 2.svg";
import { Link } from "react-router-dom";
import { FaPhone, FaUser } from "react-icons/fa";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export const Header = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <header className={styles.header}>
      {loading && <Loader />}
      <div className={styles.header_logo}>
        <img src={goblin} alt="Гоблин" />
        Гоблин
      </div>
      <ul className={styles.header_links}>
        <Link className={styles.header_links_item} to={"/p2p/deals"}>
          P2P
        </Link>
        <Link className={styles.header_links_item}>Процессинг</Link>
        <Link className={styles.header_links_item} to="/transactions">
          Переводы
        </Link>
        <Link className={styles.header_links_item} to="/p2p/my-orders">
          Мои объявления
        </Link>
      </ul>
      <div className={`${styles.header_links} ${styles.header_contacts}`}>
        <Link to={"tel:"}>
          <FaPhone style={{ transform: "rotate(90deg)" }} />
        </Link>
        <Link to={"/me"}>
          <FaUser />
        </Link>
        <div className={styles.header_user}>
          <p>{user?.email}</p>
          <div>
            <section>
              {user?.wallets?.[0]?.usdtBalance} <span>USDT</span>
            </section>
            <section>
              {user?.wallets?.[0]?.trxBalance} <span>TRX</span>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};
