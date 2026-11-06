
const express = require('express');
const pool = require('./db'); 

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static('public')); 

app.post('/add-item', async (req, res) => {
    const { name, email, phone, title, category, price, description } = req.body;

    
    if (!name || !email || !phone || !title || price === undefined) {
        return res.status(400).send('<h1>400 Bad Request</h1><p>Please fill in all required fields.</p>');
    }

    try {
        
        let [students] = await pool.query('SELECT id FROM students WHERE email = ?', [email]);
        let studentId;

        if (students.length > 0) {
            studentId = students[0].id;
        } else {
            
            const [result] = await pool.query(
                'INSERT INTO students (name, email, phone) VALUES (?, ?, ?)',
                [name, email, phone]
            );
            studentId = result.insertId; 
        }

        
        await pool.query(
            'INSERT INTO items (student_id, title, category, price, description) VALUES (?, ?, ?, ?, ?)',
            [studentId, title, category, price, description || '']
        );

        
        res.send(`
            <html lang="en">
            <head><link rel="stylesheet" href="style.css"></head>
            <body>
                <main>
                    <h2>Success!</h2>
                    <p>Thank you <strong>${name}</strong>, your item <strong>"${title}"</strong> has been published successfully!</p>
                    <a href="items.html">View Available Items</a> | <a href="index.html">Home</a>
                </main>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error: Could not publish item.');
    }
});


app.post('/request-item', async (req, res) => {
    const { name, email, phone, item_name, notes } = req.body;

    if (!name || !email || !phone || !item_name) {
        return res.status(400).send('<h1>400 Bad Request</h1><p>Please fill in all required fields.</p>');
    }

    try {
        
        let [students] = await pool.query('SELECT id FROM students WHERE email = ?', [email]);
        let studentId;

        if (students.length > 0) {
            studentId = students[0].id;
        } else {
            const [result] = await pool.query(
                'INSERT INTO students (name, email, phone) VALUES (?, ?, ?)',
                [name, email, phone]
            );
            studentId = result.insertId;
        }

        
        await pool.query(
            'INSERT INTO requests (student_id, item_name, notes) VALUES (?, ?, ?)',
            [studentId, item_name, notes || '']
        );

        res.send(`
            <html lang="en">
            <head><link rel="stylesheet" href="style.css"></head>
            <body>
                <main>
                    <h2>Request Submitted!</h2>
                    <p>Thank you <strong>${name}</strong>, your request for <strong>"${item_name}"</strong> has been logged.</p>
                    <a href="items.html">View Available Items</a> | <a href="index.html">Home</a>
                </main>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error: Could not submit request.');
    }
});

app.get('/api/items', async (req, res) => {
    try {
      
        const [rows] = await pool.query(`
            SELECT items.id, items.title, items.category, items.price, items.description, 
                   students.name AS owner_name, students.phone AS owner_phone
            FROM items
            JOIN students ON items.student_id = students.id
            ORDER BY items.created_at DESC
        `);
        res.json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


app.get('/api/requests', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT requests.id, requests.item_name, requests.notes, requests.created_at,
                   students.name AS requester_name, students.email, students.phone
            FROM requests
            JOIN students ON requests.student_id = students.id
            ORDER BY requests.created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});