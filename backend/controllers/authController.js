const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.signup = async (req, res) => {
    const { full_name, email, password } = req.body;    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
            [full_name, email, hashedPassword]
        );
        res.status(201).json({ message: "User created successfully !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis" });
    }
    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "user not founded" });
        }
        console.log(password)
        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "wrong password!" });
        }

        res.status(200).json({
            message: "Connected !",
            user: { id: user.id, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};