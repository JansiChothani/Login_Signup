import mongoose from "mongoose";

let db = () =>{
    try{
        mongoose.connect(process.env.DB_URL);
        console.log("Database Connected..." );
    }
    catch(err){
        console.log("Error in connection " + err);
    }
}

export default db