const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// IMPORTANT: Ensure your HTML file is in a folder named 'public' 
// or adjust this path to where your HTML file actually sits.
app.use(express.static(path.join(__dirname, "public"))); 

// DB Connection (with better error logging)
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Schema with Validation (Strict Requirement)
const Record = mongoose.model("Record", {
    fullName: { type: String, required: true },
    rollNo:   { type: String, required: true },
    course:   { type: String, required: true },
    year:     { type: Number, required: true },
    cgpa:     { type: Number },
    createdAt: { type: Date, default: Date.now }
});

// -------------------- API ENDPOINTS --------------------

// Get all records
app.get('/api/records', async (req, res) => {
    try {
        const data = await Record.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
});

// Create a record
app.post('/api/records', async (req, res) => {
    try {
        const rec = new Record(req.body);
        const saved = await rec.save();
        res.status(201).json(saved); // 201 means 'Created'
    } catch (error) {
        res.status(400).json({ error: "Failed to save record. Check data fields." });
    }
});

// Delete a record
app.delete('/api/records/:id', async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete record" });
    }
});

// -------------------------------------------------------

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));