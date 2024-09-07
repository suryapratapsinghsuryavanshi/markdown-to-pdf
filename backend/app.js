const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Database Schema
const userSchema = require("./schema/userSchema");

// Configs
const PORT = 8000;
const app = express();
app.use(express.urlencoded());
app.use(express.json());

// Database Connection
const connection = mongoose.createConnection(process.env.DATABASE_URI, { dbName: 'mpdf_db' });
const userModel = connection.model('user', userSchema);


//-------------------------//
//         Routes         //
//------------------------//

app.post("/create", async (req, res) => {
    const token = req.body.token;
    const markdowns = req.body.markdowns;
    const page_count = req.body.page_count;
    const current_page = req.body.current_page;
    if(token) {
        const userFind = await userModel.findOne({ token });
        if(userFind) {
            res.json({
                statusCode: 401,
                message: 'credential error'
            });
        }else {
            const user = new userModel({
                token,
                markdowns,
                page_count,
                current_page
            });
            await user.save();
            res.json({
                statusCode: 200,
                message: 'token created'
            });
        }
    }else {
        res.json({
            statusCode: 400,
            message: 'no token passed'
        });
    }
});

app.post("/sync_up", async (req, res) => {
    const token = req.body.token;
    const markdowns = req.body.markdowns;
    const page_count = req.body.page_count;
    const current_page = req.body.current_page;
    if(token) {
        const userFind = await userModel.findOne({ token });
        if(userFind) {
            await userModel.findOneAndUpdate({ token }, {
                markdowns,
                page_count,
                current_page
            });
            res.json({
                statusCode: 200,
                message: 'sync up'
            });
        }else {
            res.json({
                statusCode: 401,
                message: 'credential error'
            });
        }
    }else {
        res.json({
            statusCode: 400,
            message: 'no token passed'
        });
    }
});

app.get("/sync_down", async (req, res) => {
    const token = req.query.token;
    if(token) {
        const userFind = await userModel.findOne({ token }, { _id: 0, __v: 0, date: 0, token: 0 });
        if(userFind) {
            res.json({
                statusCode: 200,
                message: 'sync down',
                data: userFind
            });
        }else {
            res.json({
                statusCode: 401,
                message: 'credential error'
            });
        }
    }else {
        res.json({
            statusCode: 400,
            message: 'no token passed'
        });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
});
