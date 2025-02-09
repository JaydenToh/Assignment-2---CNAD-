# Assignment-2---CNAD-

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🌐 Team Fire

**Revolutionizing Self Assessment for Seniors to Use**

---

## 👥 Team Members

**🌟 Team Fire**

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

**💡 Our Solution**  
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

### **Design Considerations of the Proposed Microservices Architecture**

1. **Microservices Separation**

   - **Domain-Driven Boundaries**: Each core domain (e.g., User Management, Assessment, Notification, Exercise, Clinic, DVT) is developed as an individual microservice, allowing teams to work independently and deploy updates without affecting other services.
   - **Loose Coupling**: Services communicate primarily via REST APIs, reducing direct dependencies and making it easier to replace or update services with minimal impact on the overall system.

2. **Scalability & Resilience**

   - **Containerization**: Every microservice is encapsulated in its own Docker container, ensuring a consistent runtime environment and simplifying deployments.
   - **Kubernetes Orchestration**: The system leverages Kubernetes for automated scaling and load balancing. If demand spikes for any one microservice (e.g., the Assessment service), Kubernetes can quickly provision additional containers.

3. **Data Management & Storage**

   - **Dedicated Database Layer**: Each microservice (e.g., Notification, User Management) has access to its own database or shared database schema as needed. This prevents cross-service data conflicts and ensures data integrity.
   - **SQL & NoSQL**: A combination of relational (e.g., Microsoft SQL Server, MySQL) and NoSQL databases (e.g., Firebase, Supabase) may be used, based on each service’s data requirements and transaction patterns.
   - **Security & Compliance**: Sensitive information, such as user credentials and health data, is encrypted at rest and in transit to adhere to best practices and potential regulatory requirements.

4. **API Gateway (Optional)**

   - **Request Routing & Security**: An optional API gateway can manage cross-cutting concerns such as authentication, rate-limiting, and request forwarding. This centralization simplifies service-to-service communication and external access to internal microservices.

5. **User Experience & Frontend**

   - **Dedicated Frontend Microservice**: The React-based UI runs in its own container, communicating with the backend via well-defined APIs. This reduces coupling between the UI and backend logic, enabling independent updates.
   - **Accessibility & Senior-Centric Design**: The UI prioritizes large text, clear navigation, and simplified language to cater to seniors who need an easy-to-use interface for self-assessment and preventive measures.

6. **Reliability & Fault Tolerance**

   - **Health Checks & Monitoring**: Kubernetes performs automatic health checks on containerized services, restarting any that fail. Logging and monitoring tools are in place to detect and analyze issues quickly.
   - **Redundancy & Auto-Scaling**: Critical services (e.g., User Management, Notification) can be replicated and scaled horizontally to minimize downtime and latency.

7. **Security & Authorization**

   - **Authentication Mechanisms**: The User Management service handles secure login and signup, storing credentials in a protected database and managing sessions or tokens.
   - **Role-Based Access Control**: Certain functionalities (e.g., editing user data, booking clinic appointments) may require specific privileges, ensuring the correct level of access.

8. **Extensibility & Future Integrations**

   - **Standardized APIs**: Using RESTful endpoints and standardized data formats (JSON) enables interoperability with external systems (e.g., clinic databases, third-party health APIs).
   - **Plug-and-Play Services**: New services (e.g., advanced fall-risk analytics, additional quiz modules) can be added to the architecture with minimal friction, thanks to the microservices approach and containerization.

9. **Deployment & CI/CD**

   - **Automated Builds & Testing**: Docker images and microservice code are built and tested in a continuous integration pipeline, preventing regressions and ensuring code reliability.
   - **Rapid Updates & Rollbacks**: Rolling updates on Kubernetes allow microservices to be upgraded with no downtime. In case of issues, the cluster can quickly roll back to a stable version.

10. **Elderly-Focused Functionality**
    - **Clinic Video Management**: Simplifies clinic searches and potential appointment booking, closing the loop between self-assessment and professional consultation.
    - **Exercise Management**: Recommends senior-friendly physical activities to reduce the risk of falls and maintain overall health.
    - **DVT & Eye Assessments**: Provides specialized quizzes to identify possible conditions contributing to falls or health complications.

By adhering to these design considerations, the system delivers a robust, secure, and user-friendly application aimed at helping seniors assess and reduce their fall risk, while remaining flexible enough to evolve with future healthcare innovations.

## **📈 Architecture Diagram (Text-Based Representation)**

```
plaintext

                                 +---------------------------------------------------------+
                                 |  React Frontend Microservice (UI & Client-Side Logic)   |
                                 |    (Containerized: assignment-2---cnad---frontend)      |
                                 +---------------------------------------------------------+
                                                         |
                                                         v
                                 +---------------------------------------------------------+
                                 |              API Gateway (Optional)                     |
                                 |      (Handles request routing & security)               |
                                 +---------------------------------------------------------+
                                                         |
-------------------------------------------------------------------------------------------------------------------------
|                  |                      |                           |                      |                         |
|                  |                      |                           |                      |                         |
+------------------+    +-----------------+     +---------------------+     +----------------+     +--------------------+
|   User           |    | Assessment      |     | Calculatorisk       |     | Notification   |     | DVT               |
| Management       |    | Management      |     | Management          |     | Service        |     | (Deep Vein        |
| (User Accounts)  |    | (Quiz Logic)    |     | (Risk Evaluation)   |     | (Alerts/Email) |     | Thrombosis Quiz)  |
|(assignment-2--   |    |(assignment-2--  |     |(assignment-2--      |     |(assignment-2-- |     |(assignment-2--    |
|-cnad---user-     |    |-cnad---assessment-    |-cnad---calculatori- |     |-cnad---notific|     |-cnad---dvt)       |
|management)       |    |management)      |     |sk-management)       |     |ation-service)  |     |                   |
+------------------+    +-----------------+     +---------------------+     +----------------+     +--------------------+
                                             (Other Microservices below)
-------------------------------------------------------------------------------------------------------------------------
|                 |              |             |                    |             |
+-----------------+   +----------+   +---------+   +--------------+   +----------+
| Questions       |   | Eye-Test |   | Exercise|   | Clinic Video |   | Eye-Quiz |
| Management      |   | Management|  | Management| | Management   |   | Management
| (Quiz DB)       |   |(assignment- | |(assignment| (assignment-  |   |(assignment-
|(assignment-2--  |   |-cnad---eye- | -2--cnad--- | 2--cnad---clin|   |2--cnad---eye-
|cnad---questions- |   |test-managem| exercise-man| ic-video-manag|   |quiz-managemen
|management)      |   |ent)       | agement)    | ement)         |   |t)
+-----------------+   +----------+   +---------+   +--------------+   +----------+
                                                         |
                                                         v
                                 +---------------------------------------------------------+
                                 |        Database Layer (MySQL, etc.)                     |
                                 |     Stores User Data, Assessments & Quiz Results        |
                                 +---------------------------------------------------------+
                                                         |
                                                         v
                                 +---------------------------------------------------------+
                                 |   Cloud Infrastructure (AWS/GCP/Azure) + Kubernetes     |
                                 |          Docker + CI/CD Pipeline                         |
                                 +---------------------------------------------------------+

```

**Key Outcomes**  
✅ Modular microservices architecture for scalability and easy maintenance.  
✅ Dockerized backend services for seamless containerized deployment.  
✅ Kubernetes orchestration enabling auto-scaling and fault tolerance.  
✅ REST API-based communication ensuring interoperability between services.  
✅ Secure database integration using Supabase and Microsoft SQL Server.  
✅ User-friendly UI/UX optimized for seniors with accessibility in mind (elderly-centric design).

## **Deployment Strategy**

- Each microservice runs in its own **Docker container**.
- Kubernetes is used for **scalability** and **fault tolerance**.
- Services communicate via **REST APIs**.

---

## ✨ Feature Highlights

### Jayden Toh Xuan Ming

**User Management Microservice**

Features: Handles user authentication (login/signup), secure session management, and profile functionalities (editing personal details and uploading profile images).
Backend Services: Integrates with a robust database layer to store user credentials and profile data, ensuring secure handling of sensitive information.
Benefits: Simplifies user onboarding, streamlines profile updates, and enhances the overall user experience with quick account management.

**Exercise Management Microservice**

Features: Provides curated exercise tips and video content specifically tailored to help seniors improve strength and balance.
Backend Services: Serves as a repository of exercise routines, accessible via REST APIs.
Benefits: Encourages healthy habits and proactive fall-risk prevention through guided physical activities.

**Clinic Video Management Microservice**

Features: Enables seniors to search for nearby clinics, view relevant information, and optionally book appointments.
Backend Services: Integrates search functionality and appointment scheduling in one service, providing a streamlined healthcare support experience.
Benefits: Offers greater convenience in finding professional medical help, bridging the gap between self-assessment and actual clinical care.

**UI/UX Development (Home, Assessment, Exercise, Clinic Pages + Header & Footer)**

Features: Designed and implemented the main pages (Home, Assessment, Exercise, Clinic) with a cohesive look and feel.
Reusability: Created and reused site-wide Header and Footer components to maintain visual consistency and simplify navigation.
Benefits: Improves user engagement with an intuitive layout and user-friendly design, especially for seniors who need a clean, accessible interface.

**Translate text to Chinese or Malay**

**Docker & Kubernetes Integration**

Containerization: Wrapped each microservice in Docker containers to enable consistent environments and easy deployment.
Orchestration: Configured Kubernetes for automatic scaling, fault tolerance, and seamless service updates.
Benefits: Ensures the platform can handle traffic spikes while minimizing downtime, resulting in a more robust and responsive application.

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
- **Expected Response**:

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

  **Eye Assessment Quiz**  
  Asks questions about the eye to deduce if the elderly is more prone to falling

---

## 🛠️ Tech Stack

### 🎨 Frontend

```diff
+ React    # Interactive UI Components
+ CSS      # Modern Animations & Layouts
+ HTML     # Semantic Web Structure
```

```diff
+ Node.js   # Runtime Environment
+ Express   # REST API Framework
+ REST APIs/External APIs   # Third-party Integrations
```

```diff
+ Microsoft SQL Server  # Enterprise Data Management
+ SupaBase              # Postgres database
+ FireBase              # NoSQL database
```

```diff
+ Postman   # API Testing
+ Git       # Version Control
+ NPM       # Package Management
```

# 🚀 Installation Guide

Get your project up and running in a few simple steps!

## 📋 Prerequisites

- **Docker** (Download: [https://www.docker.com/](https://www.docker.com/))
- **Docker Compose** (Usually bundled with Docker Desktop)
- **SQL Server Management Studio (SSMS)** to run the `.sql` files for Notification and User Management microservices

_(Optional if you wish to develop locally without Docker)_

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **Git**

---

# 📌 Quick Start with Docker (All Microservices)

1. **Ensure Docker Desktop is running** on your machine.
2. **Clone** this repository to your local system.
3. **Run the database SQL files in SSMS (if using local MS SQL)**:
   - Locate the SQL scripts from **Notification Management** and **User Management** microservices.
   - Execute these scripts in your SQL Server (or equivalent setup) so that the necessary tables are created.
4. **Build and launch** all microservices together:
   ```bash
   docker-compose up --build
   ```
5. **That’s it!** Docker will spin up the frontend and all backend microservices.

_(If you only need to run them in detached mode, add `-d`: `docker-compose up --build -d`.)_

---

## 🖥️ Optional Steps for Local Development

### Frontend (Local)

```bash
# 1) Navigate to the frontend folder
cd your-repo/frontend

# 2) Install dependencies
npm install

# 3) Run the development server
npm run dev
```

(This will start the React app on a local dev server.)

### Backend (Local)

```bash
# 1) Open a new terminal window and navigate to the backend folder
cd your-repo/backend

# 2) Install dependencies
npm install

# 3) Start the backend server
node server.js
```

You can open multiple terminals if you want to run different microservices separately under the `backend` directory.

---

## 🐳 Stopping the Services

- **Docker**:
  ```bash
  docker-compose down
  ```
- **Local Node.js**: Press `Ctrl + C` in your terminal where `node server.js` is running.

---

### Common Issues & Fixes

- **Port Already in Use**

  ```bash
  npx kill-port 3000
  ```

  Then re-run your server.

- **MySQL Connection Refused**  
  Make sure the MySQL container or local DB is up:

  ```bash
  docker ps
  ```

  If MySQL is not running, start it:

  ```bash
  docker-compose up -d mysql
  ```

- **ENV File Not Loaded**
  ```bash
  npm install dotenv
  ```
  Then at the top of `app.js`:
  ```js
  require("dotenv").config();
  ```

---

## ✅ Project is Now Set Up! 🎉
