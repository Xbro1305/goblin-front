import React from "react";
import styles from "./Profile.module.scss";
import { BiChevronDown, BiGitBranch } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaChartBar } from "react-icons/fa";
import { PiCardholder } from "react-icons/pi";
import { BsClock, BsCoin } from "react-icons/bs";

export const Profile = () => {
  const [page, setPage] = React.useState("transaction");

  return (
    <div className={styles.profile}>
      <div className={styles.profile_navigation}>
        <div className={styles.profile_navigation_item}>
          <BsCoin />
          1000 <span>USDT</span>
        </div>{" "}
        <div className={styles.profile_navigation_item}>
          <BsCoin />
          1000 <span>BTC</span>
        </div>{" "}
        <div className={styles.profile_navigation_item}>
          <BsCoin />
          1000 <span>ETH</span>
        </div>{" "}
        <div className={styles.profile_navigation_item}>
          <BsCoin />
          BTC 1000 <span>ETH</span>
        </div>
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={
              page == item.key
                ? styles.profile_navigation_item_active
                : styles.profile_navigation_item
            }
            onClick={() => setPage(item.key)}
          >
            {item.icon} {item.name}
          </div>
        ))}
      </div>
      <div className={styles.profile_content}>
        {navigationItems.map((item) => {
          if (page == item.key) {
            return item.page ? item.page : <div>Page not found</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const ProfileTransaction = () => {
  const [transactionType, setTransactionType] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [currency, setCurrency] = React.useState("USDT");
  const [isOpen, setIsOpen] = React.useState(false);
  const [currencyColor, setCurrencyColor] = React.useState("#86C239");

  const handleInnerSubmit = (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    // Handle inner transfer logic here
    console.log("Inner transfer to address:", address);
  };

  const CurrencySelector = () => (
    <div className={styles.profile_transactions_currency}>
      <div className={styles.profile_transactions_select}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={styles.profile_transactions_select_value}
        >
          <p style={{ color: currencyColor }}> {currency}</p>
          <BiChevronDown />
        </div>

        {isOpen && (
          <div className={styles.profile_transactions_select_list}>
            <div
              className={styles.profile_transactions_select_item}
              onClick={() => {
                setCurrency("USDT");
                setIsOpen(false);
                setCurrencyColor("#86C239");
              }}
            >
              USDT
            </div>
            <div
              className={styles.profile_transactions_select_item}
              onClick={() => {
                setCurrency("BTC");
                setIsOpen(false);
                setCurrencyColor("#e9a907");
              }}
            >
              BTC
            </div>
            <div
              className={styles.profile_transactions_select_item}
              onClick={() => {
                setCurrency("ETH");
                setIsOpen(false);
                setCurrencyColor("#1291d9");
              }}
            >
              ETH
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.profile_transactions}>
      <div className={styles.profile_transactions_top}>
        <div
          className={
            transactionType == 0 && styles.profile_transactions_top_item_active
          }
          onClick={() => setTransactionType(0)}
        >
          Внутренний перевод
        </div>
        <div
          className={
            transactionType == 1 && styles.profile_transactions_top_item_active
          }
          onClick={() => setTransactionType(1)}
        >
          Внешний перевод
        </div>
      </div>
      {transactionType == 0 ? (
        <>
          <h1 className={styles.profile_transactions_title}>
            Введите адрес для перевода внутри биржи
          </h1>
          <form onSubmit={(e) => handleInnerSubmit(e)}>
            <div className={styles.profile_transactions_adress_input}>
              <input
                type="text"
                name="email"
                placeholder="Почта  "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <h1>Выберите крипто</h1>
            <CurrencySelector />
            <h1>Напишите количество</h1>
            <div
              style={{ flex: 1 }}
              className={styles.profile_transactions_amount_input}
            >
              <input
                type="number"
                name="amount"
                placeholder="Количество"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transactions_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button type="submit" className="red-button">
              Отправить
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className={styles.profile_transactions_title}>
            Введите адрес внешнего кошелька
          </h1>
          <form onSubmit={(e) => handleInnerSubmit(e)}>
            <div className={styles.profile_transactions_adress_input}>
              <input
                type="text"
                name="email"
                placeholder="Адрес кошелька"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <h1>Выберите крипто</h1>
            <CurrencySelector />
            <h1>Напишите количество</h1>
            <div
              style={{ flex: 1 }}
              className={styles.profile_transactions_amount_input}
            >
              <input
                type="number"
                name="amount"
                placeholder="Количество"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transactions_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button type="submit" className="red-button">
              Отправить
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const navigationItems = [
  {
    name: "Реферальная системя",
    icon: <BiGitBranch />,
    id: 0,
    key: "referral",
  },
  {
    name: "Перевод",
    id: 1,
    key: "transaction",
    icon: <GrTransaction />,
    page: <ProfileTransaction />,
  },
  { name: "Статистика", id: 2, key: "statistics", icon: <FaChartBar /> },
  { name: "Способы оплаты", id: 3, key: "payment", icon: <PiCardholder /> },
  { name: "История транзакций", id: 4, key: "transactions", icon: <BsClock /> },
];
