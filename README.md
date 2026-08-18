# 🏥 MedCare Pro — Healthcare Role-Based Access Control (RBAC) Portal

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React__Router-6.26-CA4245.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#license)

A modern, production-grade Healthcare Portal implementing strict **Role-Based Access Control (RBAC)**, data isolation, and protected route middleware across three distinct user personas: **Admin**, **Doctor**, and **Patient**.

---

## 🌟 Key Highlights for Reviewers

- 🔐 **Strict Role-Based Access Control (RBAC)**: Fine-grained access control ensuring no unauthorized data leakage.
- 🛡️ **Client-Side Protected Route Guard**: Custom `ProtectedRoute` middleware preventing direct URL tampering.
- 🏥 **Data Masking & Privacy**: Admins see system-wide aggregate counts and user management but are **strictly blocked (`🔒 Restricted`)** from viewing sensitive medical diagnoses or prescriptions.
- 👨‍⚕️ **Doctor Patient Isolation**: Doctors can only access records and write prescriptions for their **assigned patients**.
- 🧑‍⚕️ **Patient Self-Service**: Patients can view their own appointments, prescriptions, and book consultations with available specialists.
- ⚡ **Zero-Delay Vite Architecture**: Lightning-fast hot module replacement (HMR) built with React 18 & TailwindCSS.

---

## 🔐 Role-Based Access Control (RBAC) Permission Matrix

| Feature / Data Access | Admin (`admin`) | Doctor (`doctor`) | Patient (`patient`) |
| :--- | :---: | :---: | :---: |
| **System Analytics & Counts** | ✅ Full Access | ❌ Blocked | ❌ Blocked |
| **Manage Doctors & Edit Profiles** | ✅ Full Access | ❌ Blocked | ❌ Blocked |
| **User Directory (Name, Email, Role)** | ✅ Full Access | ❌ Blocked | ❌ Blocked |
| **Patient DOB, Phone & Blood Group** | 🔒 Restricted | ✅ Assigned Patients Only | ✅ Own Profile Only |
| **Medical Conditions & Notes** | 🔒 Restricted | ✅ Assigned Patients Only | ✅ Own Records Only |
| **Prescriptions Access** | 🔒 Restricted | ✅ Write & Read (Assigned) | ✅ Read Own Only |
| **Book Appointments** | ❌ Blocked | ❌ Blocked | ✅ All Active Doctors |
| **403 Unauthorized Route Guard** | Enforced | Enforced | Enforced |

---

## 🔑 Demo Login Credentials

For testing and evaluation, click the quick-login cards on the sign-in screen or use these credentials:

| Role | Email | Password | Scope & Description |
| :--- | :--- | :--- | :--- |
| 🔑 **Admin** | `admin@medcare.com` | `Admin@123` | Full administrative control, doctor profile management, system analytics. |
| 🩺 **Doctor** | `rajesh.kumar@medcare.com` | `Doc@123` | Dr. Rajesh Kumar (Cardiology) — Access to 3 assigned cardiology patients. |
| 🩺 **Doctor** | `priya.sharma@medcare.com` | `Doc@123` | Dr. Priya Sharma (Neurology) — Access to 3 assigned neurology patients. |
| 🧑‍⚕️ **Patient** | `rahul.gupta@gmail.com` | `Pat@123` | Rahul Gupta — Self-service dashboard, appointments, and prescriptions. |
| 🧑‍⚕️ **Patient** | `kavita.sharma@gmail.com` | `Pat@123` | Kavita Sharma — Self-service patient profile. |

> **Note**: All 20 hardcoded doctors use password `Doc@123` and all 30 hardcoded patients use password `Pat@123`.

---

## 🏗️ Architecture & Security Design

```
                     ┌──────────────────────────┐
                     │       User Login         │
                     └────────────┬─────────────┘
                                  │
                   ┌──────────────▼──────────────┐
                   │ Authenticated User + Role   │
                   └──────────────┬──────────────┘
                                  │
             ┌────────────────────▼────────────────────┐
             │       React Router Middleware           │
             │         <ProtectedRoute />              │
             └──────┬──────────────────┬───────────────┘
                    │                  │
    Role Allowed?   │                  │  Role Unauthorized?
         🟢 YES     │                  │     🔴 NO
┌───────────────────▼───┐  ┌───────────▼───────────┐
│ Render Role Dashboard │  │ Redirect 403 Page    │
│  - /admin/*           │  │ (/unauthorized)      │
│  - /doctor/*          │  └──────────────────────┘
│  - /patient/*         │
└───────────────────────┘
```

### 1. Route Security (`ProtectedRoute`)
Routes are guarded using custom wrapper components that verify the user session state before rendering. Attempting to manually navigate to `/admin` while logged in as a patient immediately triggers a redirect to `/unauthorized` (403 Forbidden).

### 2. Data Filtering at Component Level
- **Doctor Component Isolation**:
  `const myPatients = PATIENTS_DATA.filter(p => p.assignedDoctorId === doctor.id);`
- **Patient Component Isolation**:
  `const myAppointments = APPOINTMENTS.filter(a => a.patientId === patient.id);`

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18.3 (Hooks, Context, ES6+)
- **Routing**: React Router DOM 6.26 (Nested Routes, Protected Guards, Wildcard Redirection)
- **Styling**: TailwindCSS 3.4 (Custom Design System, Glassmorphism, Micro-animations)
- **Icons & Typography**: Google Fonts (Inter), Native Emojis
- **Build Tool**: Vite 5.4

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)

### Steps

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/Krish9006/AI-Insights.git
   cd test
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:5173/](http://localhost:5173/)

---

## 📁 Project Directory Structure

```
test/
├── index.html              # Vite HTML Entry Point
├── package.json            # Dependencies & npm scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS design tokens & fonts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
└── src/
    ├── main.jsx            # React root mount point
    ├── index.css           # Global Tailwind directives & scrollbar styles
    └── App.jsx             # RBAC Router, ProtectedRoutes & Layout Components
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
