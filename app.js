const express = require('express');
const mongoose = require('mongoose')

const {userRouter} = require('./router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(5000, async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Port 5000');
});