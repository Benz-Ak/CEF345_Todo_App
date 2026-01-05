const db = require('../config/db');

exports.createTask = async (req, res) => {
    const { title, user_id } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
            [title, user_id]
        );
        res.status(201).json({ message: "Task added !", taskId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
            [user_id]
        );
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};