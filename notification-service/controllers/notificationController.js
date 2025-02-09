const notificationModel = require("../models/notificationModel");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const notification = await notificationModel.getNotificationById(
      req.params.notificationId // Updated to match the column `notificationId`
    );
    if (notification) {
      res.status(200).json(notification);
    } else {
      res
        .status(404)
        .send({ success: false, message: "Notification not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const { title, content, status } = req.body; // Extract data from request body
    if (!title || !status) {
      return res.status(400).send({
        success: false,
        message: "Title and status are required fields",
      });
    }
    const newNotification = await notificationModel.createNotification({
      title,
      content: content || "", // Default empty content if not provided
      status,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { title, content, status } = req.body; // Extract data from request body
    if (!title || !status) {
      return res.status(400).send({
        success: false,
        message: "Title and status are required fields",
      });
    }
    const updatedNotification = await notificationModel.updateNotification(
      req.params.notificationId, // Updated to match the column `notificationId`
      { title, content: content || "", status }
    );
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await notificationModel.deleteNotification(req.params.notificationId); // Updated to match the column `notificationId`
    res.status(204).send(); // No content for successful delete
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
