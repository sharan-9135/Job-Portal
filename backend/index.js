import express, { json } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
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
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)
const PORT = process.env.PORT || 3000;
 app.listen(PORT, ()=>{
    connectDb();
    console.log(`server is running at port ${PORT}`);

    
 })