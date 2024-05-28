const { getDb } = require("../db");
const bcrypt = require('bcrypt');

const register =  async (req, res) => {
    const db = getDb();
    try {
        const duplicate = await db.collection('users').findOne({ username: req.body.username });
        if (duplicate)
            res.json({ err: "Username Already Exixts :(" })
        else {
            try {
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.pwd, 10)
                };
                db.collection('users').insertOne(newUser).then(response => {
                    res.json({ msg: true });
                }).catch(err => {
                    res.json({ err });
                })
            } catch (err) {
                res.json({ err })
            }
        }
    } catch (err) {
        res.json({ err })
    }
}

const login = async (req, res) => {
    const db = getDb();
    const user = await db.collection('users').findOne({ username: req.body.username });

    if (!user) {
        return res.json({ err: 'Username doesn`t exist' });
    }
    else {
        try {
            const match = await bcrypt.compare(req.body.pwd, user.password);

            if (match) {
                return res.json({ msg: true, role: user.role, email: user.email });
            } else {
                return res.json({ err: 'Username / password doesn`t match' });
            }
        } catch (error) {
            return res.json({ err: error });
        }
    }

}


module.exports = {
    register,
    login
}