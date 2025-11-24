🏠 RentCheck Kigali – Your Safety Net for Renting in Kigali



Developed by: Teniola Adam Olaleye  [ALU; SOFTWARE ENGINEERING STUDENT ]

📹 Watch Demo Video: https://www.loom.com/share/ea16548f5b6c43c49b5cd94eca1f19af

Helping students and tenants avoid rental scams in Kigali, Rwanda. RentCheck Kigali allows users to verify landlords and properties before signing a lease, protecting deposits and preventing rental nightmares.

📖 Table of Contents

Why RentCheck Exists

Our Solution

Features

Tech Stack

How It Works

Installation & Setup

API Overview

Usage Examples

What's Next

Contributing

Impact

License & Acknowledgments

🚨 Why RentCheck Exists

Renting in Kigali can be risky. As a student, I personally lost 360,000 RWF to a landlord who vanished. Many others have fallen victim to similar scams.

1 in 4 students report negative rental experiences

Typical deposit losses: 300,000–500,000 RWF

Students and young professionals are frequent targets

No centralized way exists to verify landlords

The question: How can students avoid this before it happens?

💡 Our Solution

RentCheck Kigali gives tenants tools to check landlords and properties before paying a deposit — simple, fast, and safe.

Key differentiators:
✅ Safety Scores: 0–100 risk score based on disputes, scam reports, and reviews
✅ Real Tenant Reviews: Only verified tenants can leave feedback
✅ Scam Alerts: Landlords with multiple complaints are flagged
✅ District-Based Search: Gasabo, Kicukiro, Nyarugenge
✅ Mobile-Friendly Design

✨ Features

For Tenants:

🔍 Quick Landlord Search – By name or property address

📊 Safety Scores

75–100 (Green): Safe

50–74 (Yellow): Caution

0–49 (Red): High risk

⚠️ Scam Alerts – Real-time warnings

⭐ Verified Tenant Reviews – Past tenants only

⚖️ Legal Dispute Tracking – Court cases, status, and history

🗺️ Smart Filters – By district, safety score, verified landlords

Platform Stats Dashboard:

Total properties indexed

Verified landlords

Safe properties

Scams prevented

🛠️ Technology Stack

Backend:

Tech	Purpose
Python 3.11	Main language
FastAPI	High-performance API
Uvicorn	ASGI server
JSON	Lightweight storage
Pydantic	Data validation

Frontend:

Tech	Purpose
React 18	Component-based UI
JavaScript (ES6+)	Interactivity
Vite	Fast build & hot reload
CSS3	Styling & responsiveness

Tools: Git, VS Code, PowerShell, Node.js

🔧 How It Works

Safety Score Algorithm (0–100 points):

Scam reports: -30 each

Pending disputes: -15 each

Resolved disputes: -5 each

Low ratings (<3 stars): -10 each

Verified landlord: +10

Multiple 5-star reviews: +5 each (max +20)

No disputes over 2 years: +10

Example:

Jean Mugabo → Score 82 (Safe)

Emmanuel Nkusi → Score 23 (High Risk)

📥 Installation & Setup
Prerequisites

Python 3.11+

Node.js 18+

Git

VS Code or preferred editor

Steps
# Clone the repo
git clone https://github.com/YOUR-USERNAME/rentcheck-kigali.git
cd rentcheck-kigali

# Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\Scripts\activate      # Windows
pip install fastapi uvicorn
python src/main.py

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev


Access the app: http://localhost:5173

📚 API Overview

Base URL: http://localhost:8000/api/v1

GET /properties/search – Search landlords and properties

GET /properties/{property_id} – Details for a property

GET /stats – Platform statistics

GET /health – Check server health

💻 Usage Examples

Finding a Safe Landlord:

Filter by Gasabo district

Set minimum score: 75+

Review results → click on a property

Read verified reviews → make informed decision

Avoiding a Scammer:

Search for "Emmanuel Nkusi"

See red warning, scam reports, and disputes

Decision: Do not rent → deposit saved

🎯 What’s Next

User accounts, reviews, scam reporting

Mobile app & WhatsApp integration

Payment & AI fraud detection

Multi-language support

Expansion to other Rwandan cities

🤝 Contributing

We welcome developers, designers, and students!

Fork the repo

Create a feature branch

Code → commit → push

Open a PR

📊 Impact

Prototype Phase:

Students protected: 12+

Scams prevented: 3

Money saved: ~1,000,000 RWF

Year 1 Goal:

Students protected: 10,000+

Scams prevented: 500+

Money saved: 150,000,000 RWF

📄 License & Acknowledgments

FastAPI & React teams

Beta testers and students who shared stories

💡 Stay safe. Check before you rent. RentCheck Kiga
