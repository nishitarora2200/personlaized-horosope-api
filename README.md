
---

### ✅ **README.md**

```markdown
# 🌌 Personalized Horoscope API

A Node.js backend service that provides personalized daily horoscopes based on the user's zodiac sign.

---

## 📌 Features
- User Signup & Login (JWT Authentication)
- Auto-detect Zodiac Sign from Birthdate
- Get Today's Horoscope (per user's zodiac)
- View Last 7 Days' Horoscope History
- Rate Limiting (5 requests/min per user)
- API Documentation with Swagger

---

## 🛠 Tech Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for Authentication
- bcrypt for Password Hashing
- moment.js for Date Handling
- Helmet + CORS for Security
---

---

## ⚙️ Setup Instructions

### 1. **Clone Repository**

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Environment Variables**

Create a `.env` file in the root folder and add:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/horoscope-db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### 4. **Run MongoDB Locally**

Make sure MongoDB is running:

```bash
mongod --dbpath /path/to/mongodb/data
```

### 5. **Start Server**

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## 🔑 API Endpoints

### **Auth**

* `POST /auth/signup` – Register a new user
* `POST /auth/login` – Login and get JWT token

### **Horoscope**

* `GET /horoscope/today` – Get today's horoscope (requires JWT)
* `GET /horoscope/history` – Get last 7 days' horoscope history

---

## ✅ Design Decisions

* Used **MongoDB** for flexible schema and quick development.
* Implemented **JWT** for stateless authentication.
* **Rate limiting** ensures API abuse prevention.
* **Moment.js** simplifies date operations.

---

## 🚀 Future Improvements

* ✅ Generate AI-based personalized horoscopes (instead of static).
* ✅ Add refresh tokens for better security.
* ✅ Add unit and integration tests (Jest).

---
