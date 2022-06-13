import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max:20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min: 6,
    },
    profilePicture:{
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default:[]
    },
    following: {
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    OnlineStatus:{
        type: Boolean,
        default:false
    }
},

{timestamps: true}

);

// var User = mongoose.model('User', UserSchema)

export default mongoose.model('User', UserSchema)