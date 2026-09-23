# 🏛️ Pune Property Empire — Peshwa Edition

### Real Estate Property Trading & Transaction Management System

A full-stack **DBMS mini project** that transforms the classic property-trading concept into a Pune-themed real estate transaction management system.

The project combines **React, Tailwind CSS, Node.js, Express.js and MySQL** to create an interactive property trading environment where player actions are persisted through REST APIs and stored in a relational database.

> **Every major action in the application becomes a real database operation.**

---

## 🚀 Project Overview

**Pune Property Empire — Peshwa Edition** is a 3-tier web-based Real Estate Trading & Transaction Management System inspired by the mechanics of classic property-trading games.

Instead of using fictional locations, the project uses **40 Pune-based properties**, ranging from traditional areas such as **Kasba Peth** to modern commercial and residential locations such as **Baner, Kothrud, MG Road, Koregaon Park, Hinjewadi and Viman Nagar**.

The application demonstrates how DBMS concepts can be integrated into a modern full-stack application.

### The three layers are:

```text
┌──────────────────────────────────────────────┐
│              PRESENTATION LAYER              │
│          React + Tailwind CSS + UI           │
└──────────────────────┬───────────────────────┘
                       │ REST API
┌──────────────────────▼───────────────────────┐
│               APPLICATION LAYER              │
│          Node.js + Express.js                │
│       Game Logic + Transaction Logic         │
└──────────────────────┬───────────────────────┘
                       │ MySQL Queries
┌──────────────────────▼───────────────────────┐
│                 DATA LAYER                   │
│                  MySQL                       │
│ players | properties | games | transactions │
└──────────────────────────────────────────────┘
```

---

# 🏠 Core Features

## 🎲 Property Trading

Players can interact with properties distributed across the Pune-themed board.

* Buy properties
* Sell properties
* Collect rent
* Mortgage properties
* Unmortgage properties
* View ownership status
* Track property development

### Property Examples

| Location      | Property Value |
| ------------- | -------------: |
| Kasba Peth    |            ₹60 |
| MG Road       |           ₹260 |
| Baner         |         Varies |
| Kothrud       |         Varies |
| Koregaon Park |         Varies |
| Hinjewadi     |         Varies |
| Viman Nagar   |           ₹400 |

The system contains **40 Pune-inspired properties**.

---

# 🏗️ Property Development

Players can develop properties by constructing:

### 🏠 Wada

House-level development.

**Construction Cost:** ₹150

### 🏰 Rajwada

Hotel-level development.

**Construction Cost:** ₹200

Property development affects the rent structure and is stored in the database.

---

# 💰 Financial & Transaction System

The project implements several financial events and game operations:

* Property purchases
* Property sales
* Rent payments
* Salary
* Income Tax
* Luxury Tax
* Mortgage
* Unmortgage
* Jail-related logic
* Player money updates

Every important transaction is recorded in the database.

---

# 💾 DBMS Integration

One of the main objectives of this project is to demonstrate that the application is not simply a frontend game.

The application communicates with the MySQL database through a Node.js/Express REST API.

### Example: Buying a Property

When a player purchases a property, multiple database operations occur.

```text
BUY PROPERTY
     │
     ▼
React Frontend
     │
     ▼
POST /api/transactions
     │
     ├── INSERT transaction
     │
     ▼
PUT /api/properties
     │
     └── UPDATE property owner
     │
     ▼
PUT /api/players
     │
     └── UPDATE player money
     │
     ▼
MySQL Database
```

This allows the application state and database state to remain synchronized.

---

# 🗄️ Database Design

The project uses **MySQL** as the relational database.

The primary tables are:

```text
players
properties
games
transactions
```

### Players

Stores player information and game-related financial/state information.

Example fields include:

```text
player_id
name
money
position
in_jail
jail_turns
```

### Properties

Stores property information and ownership.

Example concepts include:

```text
property_id
name
price
owner_id
houses
mortgaged
```

### Games

Stores game-level information.

### Transactions

Maintains the transaction/audit history of player actions.

---

# 🔗 Database Relationships

The database uses foreign-key relationships between entities.

Conceptually:

```text
PLAYER
  │
  │ owns
  ▼
PROPERTY
  │
  │ involved in
  ▼
TRANSACTION

GAME
  │
  └─────── manages game activity
```

Foreign-key relationships are used to maintain referential integrity between related records.

---

# 📊 DBMS Dashboard

The application includes a dedicated DBMS dashboard for viewing and managing database information.

## 👤 PLAYERS

Provides operations such as:

* View players
* Insert players
* Update players
* Delete players
* View player financial information

Equivalent database operation:

```sql
SELECT * FROM players;
```

---

## 🏠 PROPERTIES

Displays the 40 Pune properties and their current ownership state.

Properties can appear as:

```text
FOR SALE
OWNED
MORTGAGED
```

---

## 💳 TRANSACTIONS

The transaction table maintains an audit trail of important property and financial operations.

Example:

```text
OM bought MG ROAD for ₹260
```

This allows the history of player activity to be inspected from the database.

---

# 🧾 SQL Query Display

The project also provides visibility into database operations.

This makes it easier to understand the relationship between:

```text
User Action
     ↓
REST API
     ↓
SQL Operation
     ↓
MySQL Database
```

This was specifically implemented to demonstrate the practical connection between the frontend application and DBMS operations.

---

# 🔍 SQL & DBMS Concepts Demonstrated

The project demonstrates practical implementation of:

* CRUD operations
* SELECT queries
* INSERT queries
* UPDATE queries
* DELETE queries
* JOIN queries
* Primary keys
* Foreign keys
* Referential integrity
* Database normalization
* Transaction records
* Relational database design
* REST API integration
* Parameterized SQL queries

### Example JOIN

```sql
SELECT 
    p.name,
    pr.name
FROM players p
JOIN properties pr
    ON pr.owner_id = p.player_id;
```

This demonstrates retrieving related information from multiple tables using a relational JOIN.

---

# 🔐 Parameterized Queries

The backend uses parameterized SQL queries instead of directly concatenating user input into SQL statements.

Example:

```javascript
connection.query(
    'SELECT * FROM players WHERE player_id = ?',
    [playerId],
    callback
);
```

This approach helps reduce the risk of SQL injection caused by unsafe query construction.

---

# 🛠️ Technology Stack

## Frontend

* React 18
* Tailwind CSS
* HTML5
* JavaScript

## Backend

* Node.js
* Express.js
* MySQL2
* REST APIs
* CORS
* dotenv

## Database

* MySQL
* MySQL Workbench 8.0

## Deployment

* Vercel — Frontend
* Railway — Backend / MySQL

## Development

* Visual Studio Code
* Git
* GitHub
* MySQL Workbench

---

# 🎨 Peshwa Design System

The project was intentionally designed around Pune's historical Peshwa aesthetic instead of using a generic Monopoly-style interface.

### Color Palette

| Color            | Usage                            |
| ---------------- | -------------------------------- |
| Maroon `#6D0E0E` | Primary / Shaniwar Wada inspired |
| Kesari `#FF6B00` | Highlights                       |
| Gold `#DAA520`   | Borders / accents                |
| Cream `#FFF8E7`  | Background                       |

### Visual Elements

* Shaniwar Wada-inspired borders
* Peshwai visual language
* Warli-inspired decorative elements
* Pune locality names
* Maroon, kesari and gold color palette

The goal was to make the DBMS project visually distinctive while keeping the database functionality at its core.

---

# 📱 Responsive Design

The frontend was designed to support different screen sizes.

Target layouts include:

```text
Mobile
360px+

Tablet

Laptop / Desktop
```

The main desktop interface uses a three-section layout:

```text
┌────────────┬────────────────────┬────────────┐
│            │                    │            │
│   Player   │     Game Board     │ Properties │
│   Panel    │                    │   Panel    │
│            │                    │            │
└────────────┴────────────────────┴────────────┘
```

---

# 🧠 Game Logic

The application implements game mechanics including:

### 🎲 Dice System

* Dice rolling
* Turn management
* Double detection
* Extra-turn logic

### 👮 Jail System

* Player jail status
* Jail turns
* Turn progression

### 💰 Financial Logic

* Property purchase
* Rent calculation
* Salary
* Taxes
* Mortgage
* Unmortgage
* Development costs

---

# 🐛 Major Problems Solved

## 1. 500 Internal Server Error

The backend initially encountered database/API errors because required player state columns were missing.

Additional fields such as:

```text
position
in_jail
jail_turns
```

were added and the backend queries were adjusted accordingly.

---

## 2. Dice Getting Stuck

The dice system had a turn-state issue where the roll state was not being reset correctly.

The solution included:

* `hasRolled` state reset
* Double-handling logic
* Safety timeout

This ensured that each turn could correctly process a new dice roll.

---

## 3. Marathi Database Encoding Issue

Initial database content containing Marathi characters produced encoding problems in MySQL Workbench.

The database-facing property names were standardized to English while keeping the **Peshwai aesthetic in the UI**.

Example:

```text
BANER
MG ROAD
KOTHRUD
HINJEWADI
VIMAN NAGAR
```

---

## 4. Responsive Overflow

The board initially created horizontal overflow on smaller screens.

The frontend was adjusted using responsive sizing and overflow control to improve usability on mobile devices.

---

# 📂 Project Structure

```text
property-empire-dbms/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   └── ...
│
├── database/
│   └── database files / SQL scripts
│
├── .gitignore
├── README.md
└── ...
```

---

# ⚙️ Local Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/property-empire-dbms.git
```

```bash
cd property-empire-dbms
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## 3. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=property_empire
DB_PORT=3306
```

**Never commit `.env` to GitHub.**

---

## 4. Configure MySQL

Create the database in MySQL:

```sql
CREATE DATABASE property_empire;
```

Import/create the required tables:

```text
players
properties
games
transactions
```

---

## 5. Start the backend

```bash
node server.js
```

The backend will start on the configured local port.

---

## 6. Start the frontend

Open the frontend project and run it using your configured React development environment.

---

# 🌐 Deployment

The project architecture supports separate deployment of the frontend and backend.

```text
                INTERNET
                    │
          ┌─────────┴─────────┐
          │                   │
       Vercel              Railway
      Frontend             Backend
          │                   │
          │              Node + Express
          │                   │
          └──────────┬────────┘
                     │
                  MySQL
```

### Deployment Stack

**Frontend:** Vercel

**Backend:** Railway

**Database:** MySQL hosted through Railway

---

# 📸 Screenshots

## Main Game Board

> Add screenshot here

## Buy Property

> Add screenshot here

## Property Card

> Add screenshot here

## DBMS Dashboard

> Add screenshot here

## Properties Table

> Add screenshot here

---

# 👥 Team

### Project Team

* **Vedant Ingle**
* **Bhagyashri Sapkal**
* **Om Adhane**
* **Kaustubh Marawar**

### Project Guide

**Prof. Sachin Dada Shinde**

### Head of Department

**Dr. S. S. Balwante**

### University

**G H Raisoni International Skill Tech University, Pune**

**Academic Year:** 2026–27

---

# 🎓 Academic Purpose

This project was developed as a **Database Management System mini project** to demonstrate how theoretical database concepts can be applied to a practical full-stack application.

The project combines:

```text
DBMS
+
Web Development
+
REST APIs
+
Game Logic
+
UI/UX
+
Real-world Pune Data
```

---

# 🔮 Future Improvements

Possible future enhancements include:

* User authentication
* Online multiplayer
* Real-time multiplayer using WebSockets
* Admin authentication
* Detailed analytics dashboard
* Property search and filtering
* Advanced transaction reports
* Player statistics
* Game history
* Cloud database backups
* Mobile application
* Automated database migration system

---

# 📜 License

This project was developed for educational and academic purposes.

---

## ⭐ Project Highlights

```text
40 Pune Properties
        +
4 Relational Tables
        +
REST APIs
        +
React Interface
        +
Node.js Backend
        +
MySQL Database
        +
Real Transaction Logging
        +
Peshwa-Inspired UI
        =
Pune Property Empire
```

---

**Built with ❤️ using React, Node.js, Express.js and MySQL.**
