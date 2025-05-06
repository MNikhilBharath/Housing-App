# Full-Stack Housing Listings Web App

A simple full-stack web application for posting and browsing rental housing listings. Built using **React**, **Node.js**, **Express**, and **SQLite**, this project demonstrates backend API integration, database connectivity, and frontend form handling.

---

## Features

- Submit housing listings with Title, Description, Rent, Address, Number of rooms and Contact information.
- View a list of all submitted listings
- Fully functional REST API connected to a relational database

---

## 🛠️ Tech Stack

**Frontend:**
- React (with React Router)
- Fetch API for HTTP requests

**Backend:**
- Node.js with Express
- SQLite (via `sqlite3`)

---

## 📁 Folder Structure

housing-app/ ├── backend/ # Express + SQLite backend │ └── server.js │ └── housing.db # Auto-created SQLite database file ├── housing-client/ # React frontend │ └── src/ │ ├── App.js │ ├── ListingForm.js │ └── ListingList.js
