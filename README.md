# Assignment-2---CNAD-

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🌐 Team 1

**Revolutionizing Self Assessment for Seniors to Use**

---

## 👥 Team Members

**🌟 Team 1**

- Jayden Toh Xuan Ming
- Liew Zhan Yang
- Teo Yuan Mao
- Haziq
- Yong Xiang

---

## 📌 Project Description

**Problem Statement By Lion Befrienders**
Many seniors are susceptible to falls due to illnesses such as weakness in legs, sarcopenia, deterioration
in eyesight etc. Currently, assessment for fall risk is usually carried out by healthcare professionals and
may remain undiscovered till seniors decide to seek healthcare assistance.

How might we use Technology to offer an easy and user-friendly way for seniors to perform
preliminary self-assessment in the comfort of their own homes, with vulnerable cases being
highlighted for further clinical assessment by doctors?

## 📝 Overview
This project is a cloud-native microservices-based system designed to help seniors assess their fall risk from the comfort of their homes. It consists of multiple microservices running in containers, orchestrated using Kubernetes.

** 💡 Our Solution**  
A comprehensive platform featuring:  
🔹1. Modularity and Scalability
We adopted a microservices architecture to ensure modularity and scalability. Each microservice is designed to handle a specific domain or functionality, making it easier to maintain, update, and scale individual components without affecting the entire system.

🔹2. User Experience and Accessibility
Our website is designed with a user-friendly interface, taking into account the needs of elderly users. We aimed to create an intuitive and accessible experience, with clear navigation, simple language, and minimal cognitive load.

🔹 3. Data Security and Privacy
We implemented robust security measures to protect sensitive user data, including encryption, secure authentication, and authorization. Our solution complies with relevant data protection regulations and guidelines.

🔹4. Interoperability and Integration
Our microservices are designed to communicate with each other seamlessly, using standardized APIs and data formats. This enables easy integration with other healthcare systems, services, or devices.

🔹5. Reliability and Fault Tolerance
We implemented redundancy and failover mechanisms to ensure high availability and reliability. Our solution can detect and recover from failures, minimizing downtime and ensuring continuous service.


## **📈 Architecture Diagram (Text-Based Representation)**

```plaintext
           +--------------------------------------------------+
           |               React Frontend (UI)               |
           +--------------------------------------------------+
                               |
                               v
           +--------------------------------------------------+
           |              API Gateway (Optional)             |
           |      (Handles request routing & security)       |
           +--------------------------------------------------+
                               |
    -------------------------------------------------------------------------
    |                                   |                                   |
+------------------+      +-----------------------+      +----------------------+
| Assessment       |      | Calculator Risk       |      | Notification Service  |
| Management      |      | Management            |      | (Alerts & Reminders)  |
| (Quiz Logic)    |      | (Risk Calculation)    |      |                      |
+------------------+      +-----------------------+      +----------------------+
          |                         |                              |
+------------------+      +-----------------------+      +----------------------+
| Question         |      | Eye-Test Management   |      | Exercise Management  |
| Management      |      | (Vision-Related Quiz) |      | (Exercise Plans)      |
| (Quiz DB)       |      |                       |      |                      |
+------------------+      +-----------------------+      +----------------------+
          |                         |                              |
+------------------+      +-----------------------+      +----------------------+
| Clinic Video     |      | Database for Each    |      | Database for Each    |
| Management      |      | Microservice         |      | Microservice         |
| (Videos API)    |      | (MongoDB/Postgres)   |      | (MongoDB/Postgres)   |
+------------------+      +-----------------------+      +----------------------+
                               |
                               v
           +--------------------------------------------------+
           |        Cloud Infrastructure (AWS/GCP/Azure)      |
           |         Kubernetes + Docker + CI/CD Pipeline    |
           +--------------------------------------------------+
```
**Key Outcomes**  
✅ Modular microservices architecture for scalability and easy maintenance.
✅ Dockerized backend services for seamless containerized deployment.
✅ Kubernetes orchestration enabling auto-scaling and fault tolerance.
✅ REST API-based communication ensuring interoperability between services.
✅ Secure database integration using Supabase and Microsoft SQL Server.
✅ User-friendly UI/UX optimized for seniors with accessibility in mind (elderly centric design).

## **Deployment Strategy**
- Each microservice runs in its own **Docker container**.
- Kubernetes is used for **scalability** and **fault tolerance**.
- Services communicate via **REST APIs**.

---

## ✨ Feature Highlights

### Jayden Toh Xuan Ming

🎖️ **a**  
📚 **a**

### Liew Zhan Yang

### 📢 Features Overview

## 🔼 Notification Function
The **Notification Function** is designed to deliver seamless and efficient notification management. It allows users to:
- **Get Notifications**: Retrieve all notifications, filtered by categories like "General" and "Urgent."
- **Create Notifications**: Add new notifications with a title, content, and status.
- **Update Notifications**: Edit existing notifications for real-time updates.
- **Delete Notifications**: Remove outdated or unnecessary notifications.
- **Database Integration**: Notifications are stored in a MySQL database, ensuring robust and persistent data management.
- **Dockerized Service**: The notification function runs in a Docker container for easy deployment and scalability.

## 📧 Email Function
The **Email Function** simplifies sending email communications directly from the backend. Key features include:
- **Send Emails**: Allows users to send emails with customizable recipients, subjects, and body content.
- **SMTP Integration**: Uses NodeMailer with SMTP for reliable email delivery.
- **Environment Configurations**: Securely stores email credentials in environment variables to ensure privacy and security.
- **Error Handling**: Built-in error handling ensures reliable operation, even during failures.
- **API Endpoint**: Easily trigger email sending through a POST request to the `/send-email` endpoint.

---

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Containerization**: Docker, Docker Compose
- **Email Service**: NodeMailer with SMTP configuration

---

## 🚀 Postman Testing
### 🚨 Notification API

**Base URL**: `http://localhost:3010/notifications`

### 1. Get All Notifications
- **Method**: `GET`
- **Endpoint**: `/`
- **Description**: Fetch all notifications.
- **Example Request**: - **Expected Response**:
```json
[
  {
    "notificationId": 1,
    "title": "System Maintenance",
    "content": "The system will be down for maintenance on Friday.",
    "status": "urgent"
  },
  {
    "notificationId": 2,
    "title": "New Program",
    "content": "A new program will be introduced next month.",
    "status": "general"
  }
]

 ```

### 2. Get Notification by ID
- **Method**: `GET`
- **Endpoint**: `/:notificationId`
- **Description**: Retrieve a specific notification using its `notificationId`.
- **Example Request**: `GET http://localhost:3010/notifications/1`
- **Expected Response**:
  ```json
  {
    "notificationId": 1,
    "title": "System Maintenance",
    "content": "The system will be down for maintenance on Friday.",
    "status": "urgent"
  }
  ```

### 3. Create a Notification
- **Method**: `POST`
- **Endpoint**: `/`
- **Description**: Add a new notification to the system.
- **Request Body**:
  ```json
  {
    "title": "New Program",
    "content": "A new program will start in March.",
    "status": "general"
  }
  ```
- **Expected Response**:
  ```json
  {
    "notificationId": 3,
    "title": "New Program",
    "content": "A new program will start in March.",
    "status": "general"
  }
  ```

### 4. Update a Notification
- **Method**: `PUT`
- **Endpoint**: `/:notificationId`
- **Description**: Update an existing notification using its `notificationId`.
- **Request Body**:
  ```json
  {
    "title": "Updated Program",
    "content": "The program has been updated.",
    "status": "urgent"
  }
  ```
- **Expected Response**:
  ```json
  {
    "notificationId": 1,
    "title": "Updated Program",
    "content": "The program has been updated.",
    "status": "urgent"
  }
  ```

### 5. Delete a Notification
- **Method**: `DELETE`
- **Endpoint**: `/:notificationId`
- **Description**: Delete a specific notification using its `notificationId`.
- **Example Request**: `DELETE http://localhost:3000/notifications/1`
- **Expected Response**: `204 No Content`

---

## 📧 Email API

**Base URL**: `http://localhost:3010`

### Features:
1. **Send an Email**

### Send an Email
- **Method**: `POST`
- **Endpoint**: `/send-email`
- **Description**: Send an email to a recipient.
- **Request Body**:
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a test email."
  }
  ```
- **Expected Response**:
  ```json
  {
    "success": true,
    "message": "Email sent successfully!"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Failed to send email"
  }
  ```




## 🐳 Docker Setup
Both the **Notification Function** and **Email Function** are containerized for easy deployment. To start the services, simply run:
```bash
docker-compose up -d
```

---



### Teo Yuan Mao

- 📅 Assessment Management
Function: Generates quiz questions for fall risk assessment.
Responsibilities:
Retrieves and organizes quiz questions.
Ensures relevant questions are presented to the user.
Works with Question Management to fetch questions.
- 🧮 Calculator Risk Management
Function: Calculates the fall risk score based on quiz responses.
Responsibilities:
Processes quiz answers and computes a risk score.
Applies a risk calculation formula or logic.
Sends results to the frontend for user feedback.
- ❓ Question Management
Function: Manages the database of quiz questions.
Responsibilities:
Stores and organizes different quiz questions.
Provides questions to Assessment Management when needed.
Supports versioning or updates to quiz questions.

### Haziq

- 📸 DVT Assessment Management:
Responsibilities:
To assess the elderly by asking questions that could identify if said elderly was facing Deep Vein Thrombosis (DVT).
Allow users to find out if they are at risk of DVT/Falling as both is caused mainly by the legs being too weak hence causing the elderly to fall. 
Integrated multi-language support and text-to-speech for increase user experience.

### Yong Xiang

- 🎥 Reaction Time
Responsibilities:
To assess the elderly reaction time. Stores the reaction time and deduces if it's high or low risk of falling.
Eye Assessment Quiz
Asks questions about the eye to deduce if the elderly is more prone to falling

---

## 🛠️ Tech Stack

### 🎨 Frontend

````diff
+ React    # Interactive UI Components
+ CSS      # Modern Animations & Layouts
+ HTML     # Semantic Web Structure

+ Node.js   # Runtime Environment
+ Express    # REST API Framework
+ REST APIs/External APIs   # Third-party Integrations

+ Microsoft SQL Server  # Enterprise Data Management
+ SupaBase # Postgres database
+ FireBase # NoSQL database

+ Postman       # API Testing
+ Git           # Version Control
+ NPM           # Package Management

# 🚀 Installation Guide

Get your project up and running in a few simple steps!

## 📋 Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Github

---

## 🖥️ Frontend Setup

```bash
# Step 1: Clone the repository
git clone https://github.com/JaydenToh/Assignment-2---CNAD-.git

# Step 2: Navigate to frontend directory
cd your-repo/frontend

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev
````

# 📌 Group Project: Backend Setup Guide

This guide provides step-by-step instructions for setting up the backend of this project, including installing dependencies, running the server, and using Docker.

---

## 🚀 Project Setup Instructions

### 📌 Step 1: Open a New Terminal Window
Ensure you have the required software installed:
- **Node.js** (Download: [https://nodejs.org/](https://nodejs.org/))
- **npm** (Comes with Node.js)
- **Docker** (Download: [https://www.docker.com/](https://www.docker.com/))

---

### 📌 Step 2: Navigate to the Backend Directory
Move into the backend project folder using:
```sh
cd your-repo/backend
```
Make sure you are in the correct directory before proceeding.

### 📌 Step 3: Install Dependencies
Run the following command to install the required dependencies:
```sh
npm install
```
This will install all necessary packages listed in `package.json`.

### 📌 Step 4: Set Up Environment Variables
Create a `.env` file in the backend directory and configure your environment variables:
```sh
touch .env
```
Inside `.env`, add the following variables:
```env
# Database Configuration
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=notification

# Email Configuration
EMAIL_USER=youremail@example.com
EMAIL_PASS=yourpassword

# Application Port
PORT=3000
```
Update `yourpassword` and other values as needed.

### 📌 Step 5: Start the Backend Server
#### Option 1: Run Directly with Node.js
To start the server manually, run:
```sh
npm start
```
If your server runs successfully, you should see:
```plaintext
Server is running on port 3000
```
#### Option 2: Run with Docker
If using Docker, start the services with:
```sh
docker-compose up -d
```
This will run the backend in a Docker container.

To stop the services, use:
```sh
docker-compose down
```

### 📌 Step 6: Verify the API
After starting the server, test it by visiting:
- **API Base URL**: `http://localhost:3000`
- **Example Endpoint**: `http://localhost:3000/notifications`

#### To test with Postman, use:
- `GET http://localhost:3000/notifications` → Fetch all notifications
- `POST http://localhost:3000/notifications` → Add a new notification
- `PUT http://localhost:3000/notifications/:id` → Update an existing notification
- `DELETE http://localhost:3000/notifications/:id` → Remove a notification

### 📌 Step 7: Common Issues & Fixes
#### ❌ Port 3000 Already in Use
If you see an error like:
```plaintext
Error: listen EADDRINUSE: address already in use :::3000
```
Fix it by stopping the process using port 3000:
```sh
npx kill-port 3000
```

#### ❌ MySQL Connection Refused
If MySQL isn’t connecting, ensure the database service is running:
```sh
docker ps
```
If MySQL is not listed, restart it with:
```sh
docker-compose up -d mysql
```

#### ❌ ENV File Not Loaded
If the application fails to load `.env` variables, install dotenv:
```sh
npm install dotenv
```
Then, add this line at the top of `app.js`:
```js
require("dotenv").config();
```

### 📌 Step 8: How to Contribute
1. Pull the latest code from the repository:
   ```sh
   git pull origin main
   ```
2. Create a new branch for your changes:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and test them locally.
4. Commit and push your code:
   ```sh
   git add .
   git commit -m "Added new feature"
   git push origin feature-name
   ```
5. Create a pull request (PR) for review.

### 📌 Step 9: Stop the Server
To stop the backend server:
```sh
Ctrl + C
```
To stop the Docker container:
```sh
docker-compose down
```

✅ **Project is Now Set Up!** 🎉
You are ready to develop and test the backend. If you encounter any issues, refer to the troubleshooting section above.


node server.js
