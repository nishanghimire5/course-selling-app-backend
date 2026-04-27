const express = require('express');
require('dotenv').config();
const {dbConnect}  = require("../db")
const { userRouter } = require('../routes/user');
const { courseRouter} = require('../routes/course');
const { adminRouter } = require('../routes/admin');

const app = express();
app.use(express.json());
    dbConnect();


app.use('/user',userRouter);
app.use('/course', courseRouter);
app.use('/admin',adminRouter)


app.listen(process.env.PORT);