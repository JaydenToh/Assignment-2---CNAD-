DROP DATABASE notification;
-- Create the database
CREATE DATABASE IF NOT EXISTS notification;

-- Use the database
USE notification;

-- Create the notifications table
CREATE TABLE IF NOT EXISTS notification (
    notificationId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status ENUM('general', 'urgent') NOT NULL
);

-- Insert sample data into the notifications table
INSERT INTO notification (title, content, status) VALUES
('New Program', 'A new program will be introduced by this October, looking forward', 'general'),
('System Maintenance', 'System will be down for maintenance on Friday', 'general'),
('High Risk Alert', ' We recommend you visit the nearest clinic as soon as possible', 'urgent'),
('High Risk Information', 'We have notified your children and your doctor. ', 'urgent');


SELECT * FROM notification
where notificationId = '1';