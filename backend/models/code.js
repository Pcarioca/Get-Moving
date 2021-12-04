import mongoose from "mongoose";



const codeSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    used:{
        type: Boolean,
        default: false
    },
    email:{
        type:String,
    },
    lastName:{
        type:String,
    },
    firstName:{
        type:String,
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
    zipCode:{
        type:String,
    },
    address:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    vehicle:{
        type: String,
    }
});

const Code = mongoose.model("code", codeSchema);
export default Code;