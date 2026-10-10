# 🚧 Road Damage Reporting System

A web-based application that allows users to report damaged roads by submitting descriptions, locations, and photos. The system helps collect road damage reports in one place so they can be reviewed and addressed more efficiently.

## 📌 Project Overview

The Road Damage Reporting System is designed to make road damage reporting simple and accessible. Users can submit reports about potholes, cracked roads, and other road-related issues through a web interface.

The application uses a Node.js backend and an SQLite database to manage submitted reports.

## ✨ Features

- 📝 Submit road damage reports.
- 📍 Provide the location of damaged roads.
- 📷 Upload photos of road damage.
- 🗄️ Store report information in an SQLite database.
- 📋 View submitted reports.
- 🌐 Access the application through a web browser.
- 🔐 Admin access for authorized report management, if enabled in the application.

## 🛠️ Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database and Storage**
- SQLite
- `better-sqlite3`
- Local or persistent file storage for uploaded images

**Development Tools**
- Visual Studio Code
- Git
- GitHub

## 📂 Project Structure

```text
road-project/
├── index.html
├── style.css
├── app.js
├── server.js
├── db.js
├── schema.sql
├── road.db
├── uploads/
├── package.json
├── package-lock.json
└── README.md
```

**File descriptions**

| File | Purpose |
|---|---|
| `index.html` | Website structure |
| `style.css` | Website styling |
| `app.js` | Frontend interactions |
| `server.js` | Backend server and API routes |
| `db.js` | SQLite database connection |
| `schema.sql` | Database table definitions |
| `road.db` | SQLite database containing saved reports |
| `uploads/` | Uploaded road damage photos |
| `package.json` | Project dependencies and scripts |
