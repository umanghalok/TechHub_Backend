import connectDB from './db/index.js'
import dotenv from "dotenv";
import express from 'express';
import auth from './routes/auth.js';
import question from './routes/question.js';
import answer from './routes/answer.js';
import admin from './routes/admin.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app=express();
app.use(cors());
const PORT=8000;
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
 
//this should come before routes
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',auth);
app.use('/question',question);
app.use('/answer',answer);
app.use('/admin',admin);

app.listen(PORT,()=>{
    console.log(`Server is running successfully on PORT ${PORT}!`)
})
connectDB();