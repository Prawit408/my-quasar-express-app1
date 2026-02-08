const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ปรับปรุง CORS ให้รับค่าจาก Environment Variable
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST']
}));

app.use(express.json());

// Log Setup
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

app.get('/api/demo', (req, res) => {
    const logMessage = `[${new Date().toISOString()}] Request from ${req.ip}\n`;
    fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

    res.json({
        git: { title: 'Advanced Git Workflow', detail: 'Branch protection & Squash merge enabled.' },
        docker: { title: 'Advanced Docker', detail: 'Multi-stage builds & Healthchecks active.' }
    });
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));