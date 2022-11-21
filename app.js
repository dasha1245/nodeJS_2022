const express = require('express');
const app = express();

const userRouter = require('./router/user.router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Unknown error'
    })
})

app.listen(5000,() => {
    console.log("Listen 5000 port")
});