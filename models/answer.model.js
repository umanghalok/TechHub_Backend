import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({

    questionid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },

    answer:{
        type:String,
        required:true
    },

    // Id Of User who has posted answer for perticular question
    postedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //username of user who has posted Answer for perticular question
    postedBy: {
        type: String,
        required: true
    },

    votes:{
        type:Number,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    },
})

const Answer = mongoose.model('answer', answerSchema);
export default Answer;