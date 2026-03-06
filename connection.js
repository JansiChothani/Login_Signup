import mongoose from "mongoose";

let db = () =>{
    try{
        mongoose.connect("mongodb://localhost:27017/UserDB");
        console.log("Database Connected...");
    }
    catch(err){
        console.log("Error in connection " + err);
    }
}

export default db