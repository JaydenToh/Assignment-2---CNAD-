const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get("/", notificationController.getAllNotifications);
router.get("/:notificationId", notificationController.getNotificationById); // Use `notificationId`
router.post("/", notificationController.createNotification);
router.put("/:notificationId", notificationController.updateNotification); // Use `notificationId`
router.delete("/:notificationId", notificationController.deleteNotification); // Use `notificationId`

module.exports = router;
