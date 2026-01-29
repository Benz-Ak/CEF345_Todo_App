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
    const user_id = req.params.user_id;

    if (!user_id || user_id === 'null') {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {

        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
            [user_id]
        );
        console.log("Tasks returned from DB:", rows);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Mettre à jour l'état is_done
exports.updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { is_done } = req.body;
    db.query('UPDATE tasks SET is_done = ? WHERE id = ?', [is_done, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Statut mis à jour" });
    });
};

// Supprimer une tâche
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "task deleted" });
    });
};

exports.clearCompleted = (req, res) => {
    const { user_id } = req.params;
    db.query('DELETE FROM tasks WHERE is_done = 1 AND user_id = ?', [user_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Completed tasks deleted!", deletedCount: result.affectedRows })
    })
}