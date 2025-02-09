import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import styles from "./Notification.module.css";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notifications");
        setNotifications(response.data); // Assuming response.data is the array of notifications
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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
          ◀
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
        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p className={styles["notification-error"]}>{error}</p>
        ) : filteredNotifications.length > 0 ? (
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
