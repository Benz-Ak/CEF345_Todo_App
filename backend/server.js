const mysql = require('mysql2');
const express = require('express')
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server ready on http://localhost:${PORT}`);
})