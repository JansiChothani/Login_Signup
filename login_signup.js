import bcrypt from "bcrypt";
import express from "express";
import User from "./schema.js";
import db from "./connection.js";
import jwt  from "jsonwebtoken";
import { auth, blocklist} from "./middleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
db();

app.post("/signup", async (req, res) => {
  try{
    const id = Date.now();
    const {name, age, email, contact, password} = req.body;
    const existuser = await User.findOne({email});
    if(existuser){
        return res.status(400).json({message : "User already exist"});
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new User({
        id,
        name,
        age,
        email,
        contact,
        password : hashedpassword
    });
    await user.save()
    return res.status(201).json({message : "USer created successfully..."});
  }  
  catch(error){
    return res.status(400).json({message : error.message});
  }
})

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User does not exist"});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message : "invalid password..."});
        }

        let token = jwt.sign({id : user._id} , process.env.JWT_SECRET);

        return res.status(200).json({message : "Login successful...", token : token});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : error.message});
    }
})

app.post("/logout", auth, (req,res) => {
    try{
        blocklist.push(req.headers.authorization);
        return res.status(200).json({message : "Logout successful..."});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message : error.message});
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
})