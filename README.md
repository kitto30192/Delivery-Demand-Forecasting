# Real-Time Delivery Demand Forecasting & Fleet Optimization Matrix

An end-to-end predictive logistics platform designed to forecast 30-minute localized order demand across Uber H3 Hexagonal spatial grids. The system pairs an optimized XGBoost regressor backend with an interactive React data visualization matrix to enable dynamic driver rebalancing during peak demand shifts (e.g., severe weather, traffic gridlocks, and seasonal festivals).

---

## 🏗️ System Architecture

1. **Machine Learning Core**: Built using **XGBoost Regressor**, processing environmental context features (Hour, Day of Week, Weather conditions, Road Traffic Density, Festival status) and historical lag features (`prev_demand`) to compute continuous demand curves.
2. **Backend API**: Powered by **FastAPI**, exposing a validated JSON POST endpoint (`/api/predict`) utilizing **Pydantic** data serialization.
3. **Frontend Matrix**: Built using **React (Vite)** styled with **Tailwind CSS v4** and **Lucide React Icons**, featuring real-time interactive context controls to dynamically rebalance driver fleet allocations.

---

## 📂 Project Repository Structure

```text
Delivery-Demand-Forecasting/
├── Backend/
│   ├── main.py                 # FastAPI application server
│   ├── xgboost_model.pkl       # Serialized trained XGBoost model
├── Frontend/
│   └── my-react-app/
│       ├── src/
│       │   ├── App.jsx         # Interactive React Grid UI Component
│       │   ├── index.css       # Tailwind CSS v4 entry point (@import "tailwindcss")
│       │   └── main.jsx        # App mounting entry script
│       ├── package.json        # Frontend dependency configurations
│       ├── tailwind.config.js  # Template path definitions
│       └── postcss.config.js   # PostCSS plugin registration (@tailwindcss/postcss)
└── Software/                   # Mandatory Submission Environment Dump
    ├── Node-v18-Installer/     # Offline Node.js binary dump
    ├── Python-3-Installer/     # Offline Python setup executable dump
    └── readme.txt              # Software specific setup instructions (See below)

🚀 Quick Start Guide
1. Backend Server Setup

Navigate to the backend directory, establish dependencies, and spin up the production worker thread:
Bash

cd Backend
pip install fastapi uvicorn pandas xgboost scikit-learn joblib
uvicorn main:app --reload

The local endpoint will initialize at http://127.0.0.1:8000. Access interactive API documentation via /docs.
2. Frontend Interface Setup

Navigate to the React module root, initialize node environment packages, and boot the Vite HMR development pipeline:
Bash

cd Frontend/my-react-app
npm install
npm run dev

Open the local host link provided by Vite (typically http://localhost:5173) in your browser.
🛠️ Technology Stack Specifications

    Frontend: React 18+, Vite, Tailwind CSS v4, PostCSS, Lucide React

    Backend: Python 3.10+, FastAPI, Uvicorn, Pydantic

    Data Science / ML: XGBoost, Scikit-Learn, Pandas, Joblib


---

 💾 [Software Folder] readme.txt

Save the text below exactly as a plain text file named **`readme.txt`** and place it inside your **`Software/`** directory alongside your offline installers.

```text
========================================================================
             SOFTWARE DEPENDENCY & INSTALLATION REGISTRY
========================================================================

This folder contains a comprehensive environment dump of the tools and
software suites utilized to build, train, compile, and run the 
Delivery Demand Forecasting Tool.

Below are the detailed specifications, configuration requirements, 
and installation guides for each software package included in this directory.

------------------------------------------------------------------------
1. PYTHON RUNTIME ENVIRONMENT
------------------------------------------------------------------------
* Folder Name: /Python-3-Installer/
* Purpose: Compiles the machine learning modeling pipelines (XGBoost)
           and drives the RESTful backend web api infrastructure.
* Minimum Version Used: Python 3.10.x (64-bit)
* How to Install:
  1. Execute the installer file within the folder.
  2. CRITICAL STEP: Check the box labeled "Add Python.exe to PATH" 
     before clicking "Install Now".
  3. Verify the installation by opening a command prompt/terminal 
     and typing: python --version

------------------------------------------------------------------------
2. NODE.JS RUNTIME & PACKAGE MANAGER (NPM)
------------------------------------------------------------------------
* Folder Name: /Node-v18-Installer/
* Purpose: Drives the React frontend application layer, hosting the 
           Vite compilation server and managing Tailwind CSS compilation.
* Minimum Version Used: Node.js v18.x LTS (includes npm v9+)
* How to Install:
  1. Open the directory and launch the Node.js setup wizard (.msi/.pkg).
  2. Accept the licensing agreement and proceed with default paths.
  3. Ensure "npm package manager" and "Add to PATH" options remain selected.
  4. Complete the wizard and verify via terminal using: node -v && npm -v

------------------------------------------------------------------------
3. INTELLIGENT COMPONENT PACKAGES (INSTALLED VIA ENVIRONMENT MANAGERS)
------------------------------------------------------------------------
The following libraries are packed inside the software's production 
dependency manifests and will auto-install using the configurations 
provided in the root instructions:

A. BACKEND DEPENDENCIES (PIP Ecosystem)
   - fastapi & uvicorn: High-performance asynchronous web server core.
   - xgboost: Extreme Gradient Boosting tree architecture for regression.
   - scikit-learn: Data normalization and evaluation metrics framework.
   - joblib: Handles model serialization/deserialization (.pkl storage).

B. FRONTEND DEPENDENCIES (NPM Ecosystem)
   - vite: Next-generation hot-module reloading build tool.
   - tailwindcss v4 & @tailwindcss/postcss: Utility-first styling engine.
   - lucide-react: Modern responsive icon layout package.
========================================================================
