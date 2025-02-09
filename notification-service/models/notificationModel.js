const db = require("../dbconfig");

const getAllNotifications = async () => {
  const [rows] = await db.query("SELECT * FROM notifications");
  return rows;
};

const getNotificationById = async (id) => {
  const [rows] = await db.query("SELECT * FROM notifications WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

const createNotification = async (data) => {
  const [result] = await db.query("INSERT INTO notifications SET ?", [data]);
  return { id: result.insertId, ...data };
};

const updateNotification = async (id, data) => {
  await db.query("UPDATE notifications SET ? WHERE id = ?", [data, id]);
  return { id, ...data };
};

const deleteNotification = async (id) => {
  await db.query("DELETE FROM notifications WHERE id = ?", [id]);
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
