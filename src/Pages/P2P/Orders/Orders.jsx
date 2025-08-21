import React, { useEffect, useState } from "react";
import styles from "./Orders.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbExchange, TbFilter } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [page, setPage] = useState("Buy");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios(process.env.REACT_APP_BASE_URL + "/api/p2p/offers/available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  }, []);

  useEffect(() => {
    setItems(
      data.filter((item) => {
        if (page === "Sell") {
          return item.type === "BUY";
        } else if (page === "Buy") {
          return item.type === "SELL";
        }
      })
    );
  }, [page, data]);

  useEffect(() => {
    const d = data.filter((item) => {
      if (page === "Sell") {
        return item.type === "BUY";
      } else if (page === "Buy") {
        return item.type === "SELL";
      }
    });

    console.log(value);

    value > 1 && setItems(d.filter((i) => i.amount <= value));
  }, [value]);

  return (
    <div className={styles.deals}>
      <img src={bg} className="background" alt="" />
      <section className={styles.deals_top}>
        <h1 className="h1 title">P2P Orders</h1>{" "}
        <Link to="/p2p/create-order">+</Link>
      </section>
      <div className={styles.deals_content}>
        <div className={styles.deals_content_main}>
          <div className={styles.deals_content_main_top}>
            <div className={styles.deals_content_main_top_right}>
              <p
                className="p"
                onClick={() => setPage("Buy")}
                style={
                  page == "Buy"
                    ? {
                        color: "#000",
                        borderBottom: "2px solid #215E04",
                      }
                    : {
                        color: "#2A2E2B70",
                      }
                }
              >
                Buy
              </p>{" "}
              <p
                className="p"
                onClick={() => setPage("Sell")}
                style={
                  page == "Sell"
                    ? {
                        color: "#000",
                        borderBottom: "2px solid #215E04",
                      }
                    : {
                        color: "#2A2E2B70",
                      }
                }
              >
                Sell
              </p>
            </div>
            {/* <button className="span2">
              RUB <TbExchange />{" "}
            </button> */}
          </div>
          <div className={styles.deals_content_main_filter}>
            <div className={styles.deals_content_main_filter_right}>
              {/* <select className="span" name="crypto" id="">
                <option value="usdt" className="span">
                  USDT
                </option>
              </select> */}
              <NumericFormat
                value={value}
                placeholder="USDT Amount"
                onChange={(e) => {
                  const { value } = e.target;
                  setValue(value);
                }}
              />
              {/* <select className="span" name="payment" id="">
                <option value="local" className="span">
                  Local Card(Red) SBP
                </option>
              </select> */}
            </div>
            <button className="span">
              <TbFilter /> Filter
            </button>
          </div>
          <div className={styles.deals_content_main_body}>
            {loading ? (
              <div className={styles.deals_content_main_body_loading}>
                <p className="p">Loading...</p>
              </div>
            ) : items.length > 0 ? (
              items.map((item) => {
                return (
                  <Link
                    to={`/order/${item.id}`}
                    className={styles.deals_content_item}
                  >
                    <div className={styles.deals_content_item_top}>
                      <div className={styles.deals_content_item_top_left}>
                        <section>
                          <FaUser />
                        </section>
                        <div
                          className={styles.deals_content_item_top_left_user}
                        >
                          <p className="span">
                            {item?.user?.name || item?.user?.email}
                          </p>
                          {/* <span className="span2">когда-то</span> */}
                        </div>
                      </div>
                      {/* <div className={styles.deals_content_item_top_right}>
                        <p className="span">778 Orders</p>
                        <span></span>
                        <p className="span">98%</p>
                      </div> */}
                      <button
                        className="p"
                        style={{
                          background:
                            page == "Sell"
                              ? "var(--red-gradient)"
                              : "var(--green-gradient)",
                        }}
                      >
                        {page}
                      </button>
                    </div>

                    <p className="p" style={{ fontWeight: "600" }}>
                      ₽ {item.price}
                    </p>
                    <p>
                      Amount{" "}
                      <b style={{ fontWeight: 500 }}>{item.amount} USDT</b>
                    </p>
                    {/* <p>
                      Limits{" "}
                      <b style={{ fontWeight: 500 }}>1,000.00-5,00.00 RUB</b>
                    </p> */}
                    <p>
                      Created at{" "}
                      <b style={{ fontWeight: 500 }}>
                        {new Date(item.createdAt).toLocaleString()}
                      </b>
                    </p>
                    <section>
                      <p>{/* <span></span> SPB */}</p>
                      {/* <button
                        className="p"
                        style={{
                          background:
                            page == "Sell"
                              ? "var(--red-gradient)"
                              : "var(--green-gradient)",
                        }}
                      >
                        {page}
                      </button> */}
                    </section>
                  </Link>
                );
              })
            ) : (
              <div className={styles.deals_content_main_body_empty}>
                <p className="p">No data found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
