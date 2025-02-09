const db = require("../dbconfig");

// Fetch all notifications
const getAllNotifications = async () => {
  const [rows] = await db.query("SELECT * FROM notification");
  return rows;
};

// Fetch a single notification by its ID
const getNotificationById = async (notificationId) => {
  const [rows] = await db.query(
    "SELECT * FROM notification WHERE notificationId = ?",
    [notificationId]
  );
  return rows[0];
};

// Create a new notification
const createNotification = async (data) => {
  const [result] = await db.query(
    "INSERT INTO notification (title, content, status) VALUES (?, ?, ?)",
    [data.title, data.content, data.status]
  );
  return { notificationId: result.insertId, ...data };
};

// Update an existing notification
const updateNotification = async (notificationId, data) => {
  await db.query(
    "UPDATE notification SET title = ?, content = ?, status = ? WHERE notificationId = ?",
    [data.title, data.content, data.status, notificationId]
  );
  return { notificationId, ...data };
};

// Delete a notification by its ID
const deleteNotification = async (notificationId) => {
  await db.query("DELETE FROM notification WHERE notificationId = ?", [
    notificationId,
  ]);
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
