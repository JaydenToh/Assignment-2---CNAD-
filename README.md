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

**Our Solution**  
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
🔹  
🔹
graph LR
    participant User as "Elderly User"
    participant ReactApp as "React Web Application"
    participant APIGateway as "API Gateway (NGINX)"
    participant AssessmentService as "Assessment Management"
    participant CalculatorService as "Calculator Risk Management"
    participant ClinicVideoService as "Clinic Video Management"
    participant ExerciseService as "Exercise Management"
    participant EyeTestService as "Eye Test Management"
    participant QuestionService as "Question Management"
    participant NotificationService as "Notification Function"
    participant Database as "Database (PostgreSQL)"
    participant Kubernetes as "Kubernetes Cluster"

    User->>ReactApp: Interacts with website
    ReactApp->>APIGateway: Sends requests
    APIGateway->>AssessmentService: Routes requests
    APIGateway->>CalculatorService: Routes requests
    APIGateway->>ClinicVideoService: Routes requests
    APIGateway->>ExerciseService: Routes requests
    APIGateway->>EyeTestService: Routes requests
    APIGateway->>QuestionService: Routes requests
    APIGateway->>NotificationService: Routes requests
    AssessmentService->>Database: Stores and retrieves data
    CalculatorService->>Database: Stores and retrieves data
    ClinicVideoService->>Database: Stores and retrieves data
    ExerciseService->>Database: Stores and retrieves data
    EyeTestService->>Database: Stores and retrieves data
    QuestionService->>Database: Stores and retrieves data
    NotificationService->>Database: Stores and retrieves data
    Kubernetes->>APIGateway: Manages API Gateway
    Kubernetes->>AssessmentService: Manages Assessment Service
    Kubernetes->>CalculatorService: Manages Calculator Service
    Kubernetes->>ClinicVideoService: Manages Clinic Video Service
    Kubernetes->>ExerciseService: Manages Exercise Service
    Kubernetes->>EyeTestService: Manages Eye Test Service
    Kubernetes->>QuestionService: Manages Question Service
    Kubernetes->>NotificationService: Manages Notification Service
**Key Outcomes**  
✅
✅
✅

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

🔔

- 📅
- 🆕
- ✨

### Haziq

📊  
❓

### Yong Xiang

🤖

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
+                # Database Administration

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
