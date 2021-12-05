import mongoose from "mongoose";



const providerSchema = mongoose.Schema({
    businessName:{
        type: String,
        required: true
    },
    hqLocation:{
        type: String,
    },
    email:{
        type:String,
    },
    service:{
        type:String,
    },
    city:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
});

const Provider = mongoose.model("provider", providerSchema);
export default Provider;