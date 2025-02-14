import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Notification.module.css";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate(); // Initialize the navigate function

  // Hardcoded notification data
  const notifications = [
    {
      notificationId: 1,
      title: "New Program Introduced",
      content: "The new program will be introduced at 10 Jan",
      status: "general",
    },
    {
      notificationId: 3,
      title: "Health Alert(High Risk)",
      content:
        " We recommend you visit the nearest clinic as soon as possible ",
      status: "urgent",
    },
  ];

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(
    (notification) => notification.status === activeTab
  );

  return (
    <div className={styles["notification-container"]}>
      <header className={styles["notification-header"]}>
        {/* Navigate back to the home page on click */}
        <button
          className={styles["back-button"]}
          onClick={() => navigate("/home")}
        >
          ◀️
        </button>
        <h1 className={styles["notification-title"]}>Notification</h1>
      </header>
      <div className={styles["notification-tabs"]}>
        <button
          className={`${styles["tab"]} ${
            activeTab === "general" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`${styles["tab"]} ${
            activeTab === "urgent" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("urgent")}
        >
          Urgent
        </button>
      </div>
      <div className={styles["notification-list"]}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.notificationId}
              className={styles["notification-card"]}
            >
              <h2 className={styles["notification-card-title"]}>
                {`Title: ${notification.title}`}
              </h2>
              {notification.content && (
                <p className={styles["notification-card-content"]}>
                  {notification.content}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className={styles["notification-empty"]}>
            No {activeTab} notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;
