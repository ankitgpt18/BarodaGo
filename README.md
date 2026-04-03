# BarodaGo

> **AI-Powered Municipal Infrastructure Platform for Vadodara**

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![Flutter](https://img.shields.io/badge/Flutter-3.16-02569B?logo=flutter)](https://flutter.dev)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docs.docker.com/compose/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

BarodaGo is a civic engagement platform built for Vadodara's municipal infrastructure. It has three apps (Citizen, Admin, Worker) with AI-based incident triage, gamification, and community crowdfunding through Razorpay UPI.

## Tech Stack

- **Backend:** FastAPI, PostgreSQL + PostGIS, Redis, RabbitMQ
- **AI/ML:** Google Gemini Vision, CLIP Embeddings, ChromaDB
- **Mobile:** Flutter (Citizen App, Worker App)
- **Frontend:** React + TypeScript (Admin Panel), Mapbox GL
- **Payments:** Razorpay with UPI Integration
- **Infrastructure:** Docker, Kubernetes on GCP

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitgpt18/BarodaGo.git
   cd BarodaGo
   ```

2. **Environment Setup**
   Copy the example environment file and add your credentials:
   ```bash
   cp .env.example .env
   ```
   *Make sure to add your database URL, Gemini API key, Razorpay keys, and Firebase credentials.*

3. **Run with Docker**
   ```bash
   docker compose up --build -d
   ```

4. **Access the App**
   - **Admin Panel:** http://localhost:3000
   - **API Docs:** http://localhost:8000/docs

## License
This project is licensed under the MIT License.
