import express, { json } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
dotenv.config({});
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
const corOptions ={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corOptions))
app.use('/api/v1/user', userRoute)
const PORT = process.env.PORT || 3000;
 app.listen(PORT, ()=>{
    connectDb();
    console.log(`server is running at port ${PORT}`);

    
 })