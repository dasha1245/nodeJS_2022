require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const {envDefConfigs} = require('./config')
const {userRouter, authRouter} = require('./router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    })
})

app.listen(envDefConfigs.PORT, async () => {
    await mongoose.connect(envDefConfigs.DB_URL)
    console.log(`Server is on ${envDefConfigs.PORT} port`)
});
