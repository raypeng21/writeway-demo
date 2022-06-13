//importing
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import userRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import ideaRouter from "./routes/ideas.js"
import multer from "multer";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//app config
const app = express();

const port = 9000;

// dotenv.config();
app.use("/images", express.static(path.join(__dirname, "public/images")));
//store images in server folder/ public/images



//middleware
app.use(express.json());  
app.use(morgan("common"));  //return express middle log
app.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });


//Uploads Image API
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/ideas", ideaRouter);





//DB config
const connection_url = "mongodb+srv://admin:heTrJE3R3p5Uvfcq@cluster0.atr69.mongodb.net/Writeway?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!')
    });



const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");
})






//listen

app.listen(port,() => console.log(`Listening on localhost:${port}`))
