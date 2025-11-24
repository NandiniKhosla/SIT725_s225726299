const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add two numbers: /add?num1=5&num2=10
app.get('/add', (req, res) => {
    let n1 = Number(req.query.num1);
    let n2 = Number(req.query.num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.json({ error: "Please provide valid numbers" });
    }

    res.json({ result: n1 + n2 });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
