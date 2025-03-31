import React from "react";
import styles from "./Header.module.scss";
import goblin from "../../assets/images/Гоблин 2.svg";
import { Link } from "react-router-dom";
import { BiPhone } from "react-icons/bi";
import { FaPhone, FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <img src={goblin} alt="Гоблин" />
        Гоблин
      </div>
      <ul className={styles.header_links}>
        <Link className={styles.header_links_item}>P2P</Link>
        <Link className={styles.header_links_item}>Процессинг</Link>
        <Link className={styles.header_links_item}>Мои объявления</Link>
      </ul>
      <div className={`${styles.header_links} ${styles.header_contacts}`}>
        <Link to={"tel:"}>
          <FaPhone style={{ transform: "rotate(90deg)" }} />
        </Link>
        <Link to={"/profile"}>
          <FaUser />
        </Link>
        <div className={styles.header_user}>
          <p>Имя пользователя</p>
          <div>
            <section>
              1000 <span>USDT</span>
            </section>
            <section>
              1 <span>BTC</span>
            </section>
            <section>
              3 <span>ETH</span>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};
