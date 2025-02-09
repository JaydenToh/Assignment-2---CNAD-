import React, { useState } from "react";
import styles from "./Notification.module.css";
import { IoIosArrowBack } from "react-icons/io";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("general");
  const notifications = [
    {
      title: "New program",
      content:
        "A new program will be introduced by this October, looking forward",
    },
    { title: "New program", content: "" },
    { title: "New program", content: "" },
  ];

  return (
    <div className={styles["notification-container"]}>
      <header className={styles["notification-header"]}>
        <button className={styles["back-button"]}>
          <IoIosArrowBack size={24} />
        </button>
        <h1 className={styles["notification-title"]}>Notification</h1>
      </header>
      <div className={styles["notification-tabs"]}>
        <button
          className={`${styles.tab} ${
            activeTab === "general" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "urgent" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("urgent")}
        >
          Urgent
        </button>
      </div>
      <div className={styles["notification-list"]}>
        {activeTab === "general" &&
          notifications.map((notification, index) => (
            <div key={index} className={styles["notification-card"]}>
              <h2 className={styles["notification-card-title"]}>
                {`Title: ${notification.title}`}
              </h2>
              {notification.content && (
                <p className={styles["notification-card-content"]}>
                  {notification.content}
                </p>
              )}
            </div>
          ))}
        {activeTab === "urgent" && (
          <p className={styles["notification-empty"]}>
            No urgent notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;
