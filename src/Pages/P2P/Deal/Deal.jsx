import React, { useEffect } from "react";
import styles from "./Deal.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { BsFillTriangleFill } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { BsChatLeftDots } from "react-icons/bs";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Deal = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios(process.env.REACT_APP_BASE_URL + "/api/p2p/deals/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const deal = res?.data?.find((item) => item.id == id);
        if (deal) setData([deal]);
        else {
          enqueueSnackbar("Deal not found or is not yours", {
            variant: "error",
            autoHideDuration: 2000,
          });
          navigate("/p2p/my-deals");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        console.log(err);
        enqueueSnackbar("Ошибка", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  }, []);

  const markPaid = () => {
    axios(`${process.env.REACT_APP_BASE_URL}/api/p2p/deals/${id}/mark-paid`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        enqueueSnackbar("Marked as paid", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setData((prevData) =>
          prevData.map((deal) =>
            deal.id === id ? { ...deal, status: "PAID" } : deal
          )
        );
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        enqueueSnackbar(
          err.response.data.message || "Error confirming payment",
          {
            variant: "error",
            autoHideDuration: 2000,
          }
        );
      });
  };

  const markSeen = () => {
    axios(`${process.env.REACT_APP_BASE_URL}/api/p2p/deals/${id}/mark-seen`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        enqueueSnackbar("Payment confirmed", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setData((prevData) =>
          prevData.map((deal) =>
            deal.id === id ? { ...deal, status: "COMPLETED" } : deal
          )
        );
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        enqueueSnackbar(
          err.response.data.message || "Error confirming payment",
          {
            variant: "error",
            autoHideDuration: 2000,
          }
        );
      });
  };

  return (
    <div className={styles.myOrders}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">Deal No. {id}</h1>
      <div className={styles.myOrders_content}>
        <div className={styles.myOrders_content_main}>
          {data?.map((item) => {
            return (
              <div className={styles.myOrders_content_item}>
                <div className={styles.myOrders_content_item_top}>
                  <section>
                    <p className="p">
                      <span
                        style={{
                          color:
                            item.myRole == "SELLER" ? "#BE1600" : "#4e865a",
                        }}
                      >
                        {item.myRole.split("ER")[0]}
                      </span>{" "}
                      USDT
                    </p>
                    <span className="span">
                      {item.createdAt.split(".")[0].replace("T", " ")}
                    </span>
                  </section>
                  <div>
                    <section
                      className={styles.myOrders_content_item_top_section}
                    >
                      {/* <p>Pending Payment</p> */}
                      {/* <p>28:04</p> */}
                      {item.status == "CREATED" && item.myRole == "SELLER" ? (
                        <p className="span2">Waiting for buyer</p>
                      ) : item.status == "CREATED" &&
                        item.myRole == "BUYER" ? (
                        <button onClick={markPaid} className="green-button">
                          Отметить оплату
                        </button>
                      ) : item.status == "PAID" && item.myRole == "SELLER" ? (
                        <button className="green-button" onClick={markSeen}>
                          Подтвердить оплату
                        </button>
                      ) : item.status == "PAID" && item.myRole == "BUYER" ? (
                        <p className="span2">Waiting for confirmation</p>
                      ) : item.status == "CANCELED" ? (
                        <p className="span2">Canceled</p>
                      ) : item.status == "COMPLETED" ? (
                        <p className="span2">Completed</p>
                      ) : (
                        <p className="span2">Unknown Status</p>
                      )}
                    </section>
                    {/* <p>{">"}</p> */}
                  </div>
                </div>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Amount</span>
                  <p className="p" style={{ fontWeight: "600" }}>
                    {item.offer.amount} USDT
                  </p>
                </section>
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Price</span>
                  <p className="p">{item.offer.price} RUB</p>
                </section>{" "}
                {/* <section className={styles.myOrders_content_item_section}>
                  <span className="span">Quantity</span>
                  <p className="p">17.6222 USDT</p>
                </section>{" "} */}
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Transaction Fees</span>
                  <p className="p">0 USDT</p>
                </section>{" "}
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Order No.</span>
                  <p className="p">
                    {item.id}
                    <p>
                      <TbCopy
                        style={{ color: "#2A2E2B71", cursor: "pointer" }}
                        onClick={() => {
                          enqueueSnackbar("Скопировано", {
                            variant: "success",
                            autoHideDuration: 2000,
                          });
                          navigator.clipboard.writeText(item.id);
                        }}
                      />
                    </p>
                  </p>
                </section>{" "}
                <section className={styles.myOrders_content_item_section}>
                  <span className="span">Профиль {">"}</span>
                  <p className="p">
                    <BsChatLeftDots />
                  </p>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
