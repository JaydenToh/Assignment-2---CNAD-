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

📧  
📸
🔼
🎥

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

DVT Assessment
To assess the elderly by asking questions that could identify if said elderly was facing Deep Vein Thrombosis (DVT). Upon completion of the assessment, they will be able to find out if they are at risk of DVT/Falling as both is caused mainly by the legs being too weak hence causing the elderly to fall. 
Integrated multi-language support and text-to-speech for increase user experience.

### Yong Xiang

Reaction Time
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

# Step 1: Open new terminal window

# Step 2: Navigate to backend directory

cd your-repo/backend

# Step 3: Install dependencies

npm install

# Step 4: Start backend server

node server.js
