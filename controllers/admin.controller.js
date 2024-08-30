import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";
//===================================fetch all the users============================================
export const fetchUser = async(req, res)=>{
    try{
        let users = await User.find();
        res.status(200).json(users);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}


//===================================delete a user==================================================
export const deleteUser = async(req, res)=>{
    //console.log(req.params);
    try{
        let deletedUser = await User.findByIdAndDelete(req.params.id);
        let deletequestion = await Question.deleteMany({'user.username': deletedUser.username});

        let deleteanswer = await Answer.deleteMany({'user.username':deletedUser.username});//delete answer
        res.status(200).json("success");
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}
