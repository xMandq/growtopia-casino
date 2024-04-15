// node "%USERPROFILE%\Desktop\depo\server.js"

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BALANCE_FILE_PATH = path.join(os.homedir(), 'Desktop', 'depo', 'balance.txt');

app.use(express.json());
app.use(express.static(__dirname));

// Endpoint to fetch balance
app.get('/balance', (req, res) => {
    fs.readFile(BALANCE_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading balance file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const balance = parseInt(data);
        if (isNaN(balance)) {
            res.status(500).json({ error: 'Invalid balance' });
            return;
        }
        res.json({ balance });
    });
});

// Endpoint to update balance
app.post('/updateBalance', (req, res) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount)) {
        res.status(400).json({ error: 'Invalid amount' });
        return;
    }
    fs.readFile(BALANCE_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading balance file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        let balance = parseInt(data);
        if (isNaN(balance)) {
            res.status(500).json({ error: 'Invalid balance' });
            return;
        }
        balance += parseInt(amount);
        fs.writeFile(BALANCE_FILE_PATH, balance.toString(), 'utf8', (err) => {
            if (err) {
                console.error('Error updating balance file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ balance });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
