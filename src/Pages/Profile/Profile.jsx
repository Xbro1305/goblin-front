import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import { BiChevronDown, BiGitBranch } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaChartBar } from "react-icons/fa";
import { PiCardholder } from "react-icons/pi";
import { BsClock, BsCoin } from "react-icons/bs";
import { Input } from "../../Components/Input/Input";
import { NumericFormat } from "react-number-format";
import axios from "axios";

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

const Info = () => {
  const [user, setUser] = React.useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const data = {
    id: 3,
    email: "x.bro2010@gmail.com",
    password: "$2a$10$nHlWgHv6CDH.vtbllUdl9.c1tQ5cU8nuU80BHsK1lplc5YyBFCu5G",
    name: null,
    createdAt: "2025-04-03T08:32:22.949Z",
    wallets: [
      {
        id: 3,
        userId: 3,
        address: "TJYdN6HdhQjdFHdYtZGRpSo8tCGkTYHhqY",
        privateKey:
          '{"key":"f26653f021ff98d8e87131fc2d882550b2079426260b1841790163f11b7d457d","iv":"a6ca499b868f343c092f2fb1a4b484d2","encryptedPrivateKey":"d98efe0890dde4f8ca69c54bca0bbcee870732dcb46dc65414df1c44a012e6262b0fbc49ef316777f4fc1d4d5432075bb4d6c2f99ba369fae7fe1403d6d86aa048290339b20442601ff29d7d38846fab"}',
        blockchain: "TRON",
        createdAt: "2025-04-03T08:32:22.958Z",
        updatedAt: "2025-04-03T08:32:22.962Z",
      },
    ],
  };

  useEffect(() => {
    axios(`${baseUrl}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className={styles?.profile_info}>
      Имя:{user?.name} <br />
      Почта: {user?.email} <br />
      Дата регистрации: {user?.createdAt} <br />
      Крипто кошельки:{" "}
      {user?.wallets?.map((wallet) => {
        return (
          <div key={wallet?.id}>
            <p>Адрес: {wallet?.address}</p>
            <p>Блокчейн: {wallet?.blockchain}</p>
            <p>Дата создания: {wallet?.createdAt}</p>
            <p>Дата обновления: {wallet?.updatedAt}</p>
            <p>Приватный ключ: {wallet?.privateKey}</p>
          </div>
        );
      })}
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [code, setCode] = React.useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleInnerSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(1);
  };

  const CurrencySelector = () => (
    <div className={styles.profile_transaction_currency}>
      <div className={styles.profile_transaction_select}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={styles.profile_transaction_select_value}
        >
          <p style={{ color: currencyColor }}> {currency}</p>
          <BiChevronDown />
        </div>

        {isOpen && (
          <div className={styles.profile_transaction_select_list}>
            <div
              className={styles.profile_transaction_select_item}
              onClick={() => {
                setCurrency("USDT");
                setIsOpen(false);
                setCurrencyColor("#86C239");
              }}
            >
              USDT
            </div>
            <div
              className={styles.profile_transaction_select_item}
              onClick={() => {
                setCurrency("BTC");
                setIsOpen(false);
                setCurrencyColor("#e9a907");
              }}
            >
              BTC
            </div>
            <div
              className={styles.profile_transaction_select_item}
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

  const handleTranslate = () => {
    const internalConfig = {
      method: "POST",
      url: `${baseUrl}/api/transactions/internal-transfer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        recipientEmail: address,
        amount,
        currency,
      },
    };

    const externalConfig = {
      method: "POST",
      url: `${baseUrl}/api/transactions/external-transfer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        externalAddress: address,
        amount,
        currency,
      },
    };

    axios(transactionType == 0 ? internalConfig : externalConfig)
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(3);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.profile_transaction}>
      <div className={styles.profile_transaction_top}>
        <div
          className={
            transactionType == 0 && styles.profile_transaction_top_item_active
          }
          onClick={() => setTransactionType(0)}
        >
          Внутренний перевод
        </div>
        <div
          className={
            transactionType == 1 && styles.profile_transaction_top_item_active
          }
          onClick={() => setTransactionType(1)}
        >
          Внешний перевод
        </div>
      </div>
      {transactionType == 0 ? (
        <>
          <h1 className={styles.profile_transaction_title}>
            Введите адрес для перевода внутри биржи
          </h1>
          <form
            className={styles.profile_transaction_form}
            onSubmit={(e) => handleInnerSubmit(e)}
          >
            <div className={styles.profile_transaction_adress_input}>
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
              className={styles.profile_transaction_amount_input}
            >
              <NumericFormat
                required
                thousandSeparator=" "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                decimalSeparator=","
                value={amount}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setAmount(value);
                }}
                placeholder="Количество"
                className={styles.profile_transaction_amount_input}
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transaction_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button
              type="submit"
              className={`"red-button" ${styles.profile_transaction_sendButton}`}
            >
              Отправить
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className={styles.profile_transaction_title}>
            Введите адрес внешнего кошелька
          </h1>
          <form
            className={styles.profile_transaction_form}
            onSubmit={(e) => handleInnerSubmit(e)}
          >
            <div className={styles.profile_transaction_adress_input}>
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
              className={styles.profile_transaction_amount_input}
            >
              <NumericFormat
                required
                thousandSeparator=" "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                decimalSeparator=","
                value={amount}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setAmount(value);
                }}
                placeholder="Количество"
                className={styles.profile_transaction_amount_input}
              />
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>

            <div className={styles.profile_transaction_amount}>
              {amount}
              <p style={{ color: currencyColor }}>{currency}</p>
            </div>
            <button
              type="submit"
              className={`"red-button" ${styles.profile_transaction_sendButton}`}
            >
              Отправить
            </button>
          </form>
        </>
      )}

      {isModalOpen == 1 && (
        <div className={styles.modal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(2);
            }}
            className={styles.modal_content}
          >
            <h1>Введите код</h1>
            <p>
              Введите код, отправленный вам на почту для подтверждения перевода
              в <br />
              <b> {amount}</b>{" "}
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <Input
              type="text"
              placeholder={<p>Код с почты</p>}
              value={code}
              onChange={(value) => setCode(value)}
            />
            <button type="submit" className="green-button">
              Перевести
            </button>
            <button
              className="red-button"
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
            >
              Отмена
            </button>
          </form>
        </div>
      )}

      {isModalOpen == 2 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1>Подтвердите действие</h1>
            <p>
              Вы уверенны что хотите перевести ваши средста на другой кошелек?
            </p>
            <Input value={address} readonly={true} />
            <p className={styles.modal_amount}>
              <b>{amount}</b>
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <button
              onClick={() => handleTranslate()}
              className="green-button"
              style={{ marginTop: "20px" }}
            >
              Подтверждаю
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
              className="red-button"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {isModalOpen == 3 && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h1 style={{ color: "#86C239" }}>Успешно!</h1>
            <p>Перевод успешно выполнен</p>
            <p>
              Сумма перевода
              <b> {amount}</b>{" "}
              <b style={{ color: currencyColor }}>{currency}</b>
            </p>
            <p>На аккаунт:</p>
            <Input value={address} readonly={true} />
            <button
              className="link"
              onClick={() => {
                setIsModalOpen(false);
                setCode("");
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const transactionHistory = [
  {
    id: 0,
    date: "2023-10-01",
    address: "0x1234567890abcdef",
    amount: 100,
    currency: "USDT",
    currencyColor: "#86C239",
    status: "Completed",
  },
  {
    id: 1,
    date: "2023-10-02",
    address: "0x1234567890abcdef",
    amount: 50,
    currency: "BTC",
    currencyColor: "#e9a907",
    status: "Pending",
  },
  {
    id: 1,
    date: "2023-10-02",
    address: "0x1234567890abcdef",
    amount: 50,
    currency: "ETH",
    currencyColor: "#1291d9",
    status: "Pending",
  },
];

const TransactionHistory = () => {
  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/api/transactions/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles.profile_transaction_history}>
      <h1>
        <BsClock style={{ color: "#86C239" }} />
        История транзакций
      </h1>
      <table className={styles.profile_transaction_history_table}>
        <div className={styles.profile_transaction_history_table_head}>
          <th>ID</th>
          <th>Почта</th>
          <th>Сумма</th>
          <th>Дата</th>
        </div>
        <div className={styles.profile_transaction_history_table_body}>
          {transactionHistory.map((transaction) => (
            <div key={transaction.id}>
              <p>{transaction.id}</p>
              <p>{transaction.address}</p>
              <p>
                {transaction.amount}
                <p
                  style={{
                    color:
                      transaction.currency == "USDT"
                        ? "#86C239"
                        : transaction.currency == "BTC"
                        ? "#e9a907"
                        : "#1291d9",
                  }}
                >
                  {transaction.currency}
                </p>
              </p>
              <p>{transaction.date}</p>
            </div>
          ))}
        </div>
      </table>
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
  {
    name: "Статистика",
    id: 2,
    key: "statistics",
    icon: <FaChartBar />,
    page: <Info />,
  },
  { name: "Способы оплаты", id: 3, key: "payment", icon: <PiCardholder /> },
  {
    name: "История транзакций",
    id: 4,
    key: "transactions",
    icon: <BsClock />,
    page: <TransactionHistory />,
  },
];
