# 💸 AI Expense Tracker

An AI-powered Expense Tracker built using the MERN Stack that helps users manage expenses, set monthly budgets, analyze spending habits, and even add expenses using Natural Language or Receipt Scanning.

---

## 🚀 Features

### 🔐 Authentication
- Email & Password Authentication
- Google OAuth Login
- Secure session-based authentication using Passport.js
- Password hashing using bcrypt

### 💰 Expense Management
- Add Income & Expenses
- Edit Transactions
- Delete Transactions
- Transaction History
- Category-based organization

### 🤖 AI Features
- Add expenses using natural language
  - Example:
    - "Spent ₹350 on Pizza yesterday"
    - "Paid ₹1200 for electricity"
- AI extracts:
  - Title
  - Amount
  - Category
  - Date
  - Type

### 🧾 Receipt Scanner
- Upload receipt images
- Gemini Vision extracts transaction details automatically
- Preview before saving
- Editable fields before confirmation

### 📊 Dashboard
- Today's Spending
- Monthly Spending
- Monthly Income
- Amount Saved
- Recent Transactions
- Expense Pie Chart
- AI Insight section

### 💵 Budget Manager
- Monthly Budget
- Warning Percentage
- Budget Progress Bar
- Remaining Budget
- Budget Alerts

### 👤 User Profile
- Update Name
- Change Password
- Google/Login Provider Detection
- Logout

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hot Toast
- React DatePicker

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Express Session
- Multer

## AI

- Google Gemini 2.5 Flash
- Gemini Vision API

---

# 📁 Project Structure

```
Expense Tracker
│
├── client
│   ├── components
│   ├── pages
│   ├── services
│   └── context
│
├── server
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── middleware
│   ├── models
│   └── config
│
└── README.md
```

---

# ⚙ Installation

## Clone

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

## Backend

```bash
cd server
npm install
```

Create a `.env`

```
PORT=5000

MONGO_URI=

SESSION_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=

CLIENT_URL=http://localhost:5173
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Future Improvements

- 📈 Monthly Reports (PDF)
- 📊 Expense Prediction
- 🔔 Email Notifications
- 🌙 Dark Mode
- 📅 Calendar View
- 🔍 Advanced Filters & Search

---

# 👨‍💻 Author

**Saravana Kumar**

NIT Tiruchirappalli
