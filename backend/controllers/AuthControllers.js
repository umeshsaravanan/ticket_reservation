const bcrypt = require('bcrypt');
const User = require("../models/UserModel");

const register = async (req, res) => {
    try {
        const duplicate = await User.findOne({ $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]});
        if (duplicate){
            if (duplicate.username === req.body.username)
                return res.json({ err: "Username Already Exists :(" });
            else
                return res.json({ err: "Email Already Exists :(" });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    pwd: hashedPassword
                });
                await newUser.save();
                return res.json({ msg: true });
            } catch (err) {
                return res.json({ err: 'Error' });
            }
        }
    } catch (err) {
        console.log(err)
        return res.json({ err: 'Error' });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({ err: 'Username doesn\'t exist' });
        } else {
            const match = await bcrypt.compare(req.body.pwd, user.pwd);
            if (match) {
                return res.json({ msg: true, role: user.role, email: user.email });
            } else {
                return res.json({ err: 'Username / password doesn\'t match' });
            }
        }
    } catch (error) {
        return res.json({ err: 'Error' });
    }
}

module.exports = {
    register,
    login
}
