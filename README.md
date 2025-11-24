🏠 RentCheck Kigali – Your Safety Net for Renting in Kigali

Helping Students Avoid Rental Scams in Kigali, Rwanda

RentCheck Kigali is a platform that helps students and tenants verify landlords and properties before signing a lease. Say goodbye to deposit scams and rental nightmares.








📹 Watch Demo Video   

https://www.loom.com/share/ea16548f5b6c43c49b5cd94eca1f19af

📖 Table of Contents

Why RentCheck Exists

Our Solution

Features

Tech Stack

How It Works

Installation & Setup

API Overview

Project Structure

Usage Examples

What's Next

Contributing

Impact

License & Acknowledgments

🚨 Why RentCheck Exists

As a student in Kigali, I learned the hard way that renting can be risky. A landlord once took 360,000 RWF from me and vanished. Unfortunately, I later found out three other students had fallen for the same scam.

Some facts about renting in Kigali:

1 in 4 students report negative rental experiences

Typical deposit losses: 300,000–500,000 RWF

University students and young professionals are the main targets

There’s no centralized way to check if a landlord is trustworthy

The question was clear: How can students avoid this before it happens?

💡 Our Solution

RentCheck Kigali gives tenants the tools to check landlords and properties before paying a deposit. It’s a simple, fast way to make renting safer.

What Makes Us Different

✅ Safety Scores – See a 0-100 risk score based on disputes, scam reports, tenant reviews, and property maintenance.
✅ Real Tenant Reviews – Only verified tenants can leave feedback. No fake ratings.
✅ Scam Alerts – Landlords with multiple complaints get flagged instantly.
✅ District-Based Search – Find safe properties in Gasabo, Kicukiro, or Nyarugenge.
✅ Mobile-Friendly Design – Works beautifully on phones, tablets, or desktops.

✨ Key Features
For Tenants:

🔍 Quick Landlord Search – Search by name or property address and see results instantly.

📊 Safety Scores

75-100 (Green): Safe to rent

50-74 (Yellow): Caution advised

0-49 (Red): High risk

⚠️ Scam Alerts – Real-time warnings with details of fraud incidents.

⭐ Verified Tenant Reviews – Only past tenants who can be verified leave ratings.

⚖️ Legal Dispute Tracking – Shows court cases, status, and history of disputes.

🗺️ Smart Filters – Search by district, minimum safety score, or verified landlords.

Platform Stats Dashboard

Total properties indexed

Verified landlords

Safe properties

Scams prevented

🛠️ Technology Stack
Backend
Tech	Purpose
Python 3.11	Main programming language
FastAPI	High-performance API framework
Uvicorn	ASGI server for speed
JSON	Lightweight data storage
Pydantic	Data validation & safety
Frontend
Tech	Purpose
React 18	Component-based UI
JavaScript (ES6+)	Interactivity & logic
Vite	Fast build and hot reload
CSS3	Styling & responsive design
Tools

Git, VS Code, PowerShell, Node.js

🔧 How It Works
Safety Score Algorithm

Every landlord gets a 0-100 score. Points are added or deducted based on:

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

VS Code (or preferred editor)

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

GET /properties/{property_id} – Details for a specific property

GET /stats – Platform statistics

GET /health – Check server health

💻 Usage Examples

Finding a Safe Landlord:

Filter by Gasabo district

Set minimum score: 75+

Review results → click on a property

Read verified reviews and make an informed decision

Avoiding a Scammer:

Search for "Emmanuel Nkusi"

See red warning, scam reports, and pending disputes

Decision: Do not rent → saved your deposit!

🎯 What’s Next

Next 3–12 months:

User accounts, reviews, scam reporting

Mobile app & WhatsApp integration

Payment & AI fraud detection

Multi-language support

Expansion to other Rwandan cities

🤝 Contributing

We welcome developers, designers, and students passionate about safe renting!

Steps to contribute:

Fork → create a feature branch → code → commit → push → open a PR

📊 Impact

Prototype Phase:

Students protected: 12+

Scams prevented: 3

Money saved: ~1,000,000 RWF

Year 1 Goal:

Students protected: 10,000+

Scams prevented: 500+

Money saved: 150,000,000 RWF

📄 License


FastAPI & React teams

Beta testers and students who shared their stories

💡 Stay safe. Check before you rent. RentCheck Kigali.
