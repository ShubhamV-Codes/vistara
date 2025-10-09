<h1 align="center">✨ Vistara — Find Your Perfect Stay ✨</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen" />
  <img src="https://img.shields.io/badge/Built%20With-Node.js%20%7C%20Express%20%7C%20MongoDB-blue" />
  <img src="https://img.shields.io/badge/Deployed%20On-Render-lightgrey" />
</p>

<p align="center">
  <a href="https://vistara-5oq3.onrender.com/" target="_blank">🌐 Live Website</a> 
</p>

---

## 🏡 About

**Vistara** is a full-stack web app for discovering, listing, and booking beautiful stays — inspired by Airbnb’s idea of “belonging anywhere.”  
Built for both **hosts** and **travelers**, Vistara focuses on simplicity, aesthetics, and seamless usability.

> “Stay different. Stay anywhere.”

---

## ✨ Features <a name="features"></a>

✅ **Dynamic Listings** — Explore curated homes, villas, and stays with real-time data  
✅ **Host Portal** — Add, edit, and manage your own property listings  
✅ **Map Integration** — View location previews using Mapbox  
✅ **Reviews & Ratings** — Guests can share feedback and rate experiences  
✅ **Authentication** — Secure login and sign-up using Passport.js  
✅ **Image Uploads** — Cloudinary-powered image storage  
✅ **Fully Responsive** — Optimized for desktop, tablet, and mobile  
✅ **Deployed on Render** — Stable and production-ready  

---


## 🧠 Tech Stack <a name="tech-stack"></a>

| Category | Technologies |
|-----------|--------------|
| **Frontend** | EJS, CSS3, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Passport.js |
| **Image Hosting** | Cloudinary |
| **Maps** | Mapbox SDK |
| **Deployment** | Render |

---

## ⚙️ Setup & Installation <a name="setup"></a>

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhamV-Codes/vistara.git
cd vistara

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file and add your credentials
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MONGO_URI=your_mongodb_url
SESSION_SECRET=your_session_secret

# 4️⃣ Run the app locally
npm run dev

# App will start at:
👉 http://localhost:8080
