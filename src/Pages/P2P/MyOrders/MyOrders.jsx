import React from "react";
import styles from "./MyOrders.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { BsFillTriangleFill } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { BsChatLeftDots } from "react-icons/bs";
import { enqueueSnackbar } from "notistack";

export const MyOrders = () => {
  const [page, setPage] = React.useState("active");
  return (
    <div className={styles.myOrders}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">Orders</h1>
      <div className={styles.myOrders_content}>
        <div className={styles.myOrders_content_top}>
          <section className={styles.myOrders_content_top_section}>
            <p
              className="p"
              onClick={() => setPage("active")}
              style={
                page === "active"
                  ? { borderBottom: "2px solid var(--green)", color: "#000" }
                  : { color: "#2A2E2B71" }
              }
            >
              Active
            </p>
            <p
              className="p"
              onClick={() => setPage("all")}
              style={
                page === "all"
                  ? { borderBottom: "2px solid var(--green)", color: "#000" }
                  : { color: "#2A2E2B71" }
              }
            >
              All
            </p>
          </section>
          <section className={styles.myOrders_content_top_sort}>
            <div>
              <p className="span2">All types</p>
              <p style={{ transform: "rotate(180deg)", color: "#00000051" }}>
                <BsFillTriangleFill />
              </p>
            </div>
            <div>
              <p className="span2">All Statuses</p>
              <p>
                <BsFillTriangleFill />
              </p>
            </div>
          </section>
        </div>
        <div className={styles.myOrders_content_main}>
          <div className={styles.myOrders_content_item}>
            <div className={styles.myOrders_content_item_top}>
              <section>
                <p className="p">
                  <span style={{ color: "#BE1600" }}>Sell</span> USDT
                </p>
                <span className="span">2025-04-08 19:25:12</span>
              </section>
              <div>
                <section>
                  <p style={{ color: "#D5B500" }}>Pending Payment</p>
                  <p style={{ color: "#D5B500" }}>28:04</p>
                </section>
                <p style={{ color: "#D5B500" }}>{">"}</p>
              </div>
            </div>
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Amount</span>
              <p className="p" style={{ color: "#BE1600", fontWeight: "600" }}>
                1,500.00 RUB
              </p>
            </section>
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Price</span>
              <p className="p">85.12 RUB</p>
            </section>{" "}
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Quantity</span>
              <p className="p">17.6222 USDT</p>
            </section>{" "}
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Transaction Fees</span>
              <p className="p">0 USDT</p>
            </section>{" "}
            <section className={styles.myOrders_content_item_section}>
              <span className="span">Order No.</span>
              <p className="p">
                1909658797187162112{" "}
                <p>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("1909658797187162112");
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
        </div>
      </div>
    </div>
  );
};
