import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title:{
        type:String,
        required:true,
    },

    question:{
        type:String,
        required:true,
    },

    tags:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    },

    votes:{
        type:Number,
        required:true
    }
})


const Question = mongoose.model('question',questionSchema);
export default Question;