import mg from "mongoose";

const MySchema = new mg.Schema({
    id: {
        type : Number,
        unique : true,
        required : true,
    },
    name : String,
    age : Number,
    email : {
        type : String,
        unique : true,
    },
    contact : Number,
    password : String
})

let User = mg.model("User", MySchema);

export default User