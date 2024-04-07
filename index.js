const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('../bot/db');
const cors = require('cors');

const User = require('../bot/models/User');

const app = express();
const port = 80;

app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());

const userRouter = require('./routes/user');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server start on PORT ${port}`);
});

app.get('/users/:telegramId/coins', async (req, res) => {
    try {
        const telegramId = req.params.telegramId;
        const user = await User.findOne({ telegramId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ coins: user.coins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
