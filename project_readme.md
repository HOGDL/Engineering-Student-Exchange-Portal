# 🎓 Engineering Student Exchange Portal - FEE Menofia

## 💡 About The Project
The **Engineering Student Exchange Portal** is a web-based platform specifically designed for the students of the **Faculty of Electronic Engineering (FEE), Menofia University**. 

**The Real-Life Problem:** 
Engineering students often purchase expensive academic tools (e.g., chemistry lab coats, T-squares, drawing boards, and specific reference books) that are only required for a single semester. Later, these tools sit unused, while incoming students struggle with the high costs of buying them new.

**The Solution:** 
A lean, full-stack web application that allows senior students to list their unused tools and textbooks for exchange, cheap sale, or free donation. Incoming students can browse available items and submit direct requests, creating a sustainable, student-to-student circular economy.

---

## 🚀 Features
- **Browse Items:** View available lab tools, drawing equipment, and books on a dynamic dashboard.
- **List an Item:** Add new items to the portal through a secure server-side validated form.
- **Request an Item:** Reserve or request available items through a streamlined form.
- **Security First:** Protected against SQL Injection (using parameter placeholders) and Cross-Site Scripting (XSS) (using `textContent` DOM manipulation).

---

## 🛠️ Tech Stack
This project is built using a custom vanilla architecture to demonstrate deep understanding of core web technologies without relying on heavy frameworks:

* **Frontend:** HTML5 (Semantic), CSS3 (Flexbox/Grid), Vanilla JavaScript (DOM Manipulation & Fetch API)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (using `mysql2/promise` with Connection Pooling)

---

## ⚙️ Getting Started (Local Setup)

To get a local copy up and running, follow these simple steps.

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) & MySQL Workbench installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/engineering-exchange.git
   cd engineering-exchange
   ```

2. **Set up the Database**
   - Open **MySQL Workbench**.
   - Create a new SQL tab and copy the contents of `schema.sql` into it.
   - Run the script to create the `engineering_exchange` database and its tables (`students`, `items`, `requests`).

3. **Configure Database Credentials**
   - Open `db.js`.
   - Update the `user` and `password` fields to match your local MySQL configuration:
     ```javascript
     const pool = mysql.createPool({
         host: 'localhost',
         user: 'root', // Your MySQL username
         password: 'your_password', // Your MySQL password
         database: 'engineering_exchange',
         // ...
     });
     ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Start the Server**
   ```bash
   node server.js
   ```

6. **View the App**
   Open your browser and navigate to: `http://localhost:3000`

---

## 📂 Project Structure
```text
engineering_exchange/
├── public/                  # Frontend files (Static)
│   ├── index.html           # Landing page
│   ├── items.html           # Display all items
│   ├── add-item.html        # Form to list an item
│   ├── request.html         # Form to request an item
│   ├── style.css            # Stylesheet (Custom color palette)
│   └── app.js               # Client-side logic & API fetching
├── db.js                    # MySQL Database connection pool
├── schema.sql               # Database creation script
├── server.js                # Express Server, API Routes, & Backend Logic
├── .gitignore               # Ignored files for Git
└── README.md                # Project documentation
```