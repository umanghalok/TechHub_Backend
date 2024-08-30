import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";


//===============================================Add a question=========================================
export const addQuestion = async (req, res) => {
    try {
        //console.log(req.body.user);
        //console.log(req.body);
        let user = await User.findOne({ email: req.body.user.email });
        //console.log(user);
        let question = await Question.create({
            user: user._id,
            title: req.body.title,
            question: req.body.question,
            tags: req.body.tags,
            votes: 0
        })

        res.status(200).json({ "Success": "Added Query Successfully"})
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
}

//===============================================Fetch all questions in reverse order=========================================
export const fetchQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'username');
        console.log(questions);
        res.status(200).json(questions.reverse());
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
}

//===============================================Fetch all questions in order of votes=========================================
export const fetchQuestionsByHigherVotes =  async (req, res) => {
    try {
        const questions = await Question.find().populate('user', 'username').sort({ votes: -1 });
        console.log(questions);
        res.status(200).json(questions);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
}

//===============================================Fetch a single question by id=========================================
export const fetchQuestionsById = async (req, res) => {
    try {
        let question = await Question.findOne({ _id: req.params.id }).populate('user', 'username');

        if (!question) {
            return res.status(404).send("Question not Found");
        }
        res.status(200).json(question);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

//===============================================Update a question=========================================
export const updateQuestion = async(req, res)=>{
    try{
        const {title, question, tags} = req.body;
        //console.log(title);
        //console.log(question);
        const newquestion = {};
        newquestion.title = title;
        newquestion.question = question;
        newquestion.tags = tags;
        let fetchquestion = await Question.findByIdAndUpdate(req.params.id, {$set : newquestion}, {new : true});
        res.status(200).json({status:"updated"});
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

//===============================================Delete a question and all its answers=========================================
export const deleteQuestion = async(req, res)=>{
    try{
        let deletequestion = await Question.findByIdAndDelete(req.params.id);//delete question

        await Answer.deleteMany({questionid : req.params.id});//delete answer
        res.status(200).json({status:"deleted"});
        
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}


//===============================================Fetch all questions of a user=========================================
export const fetchUserQuestions= async (req, res) => {
    try {
        //console.log(req.query);
        let user = await User.findOne({ username: req.query.username });

        const questions = await Question.find({ user: user._id }).populate('user', 'username');

        if (!questions) {
            return res.status(404).send("Question not Found");
        }

        res.status(200).json(questions);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}


//===============================================Fetch all filtered question of a user=========================================
export const fetchUserFilteredQuestions= async (req, res) => {
    try {
        //console.log(req.query);
        let user = await User.findOne({ username: req.query.username });
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const tags = req.query.tags;

        const questions = await Question.find({
            user: user._id
        }).populate('user', 'username');

        if (!questions) {
            return res.status(404).send("Question not Found");
        }

        const afterDateapplied = [];
        questions.map(que => {
            const year = que.date.getUTCFullYear();
            var month = que.date.getUTCMonth()+1;
            var day  = que.date.getUTCDate();
            
            if(month>='0' && month<='9') month = "0"+month;
            if(day>='0' && day<='9') day = "0"+day;
            
            const date = year+"-"+month+"-"+day;

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(que);
            }
        })

        const afterTagsapplied = [];
        if(tags){
        if(!startDate||!endDate)
        {
            questions.map(que => {
                if(que.tags.split(" ").includes(tags)){
                    afterTagsapplied.push(que);
                }
            })
        }
        else
        {
            afterDateapplied.map(que => {
                if(que.tags.split(" ").includes(tags)){
                    afterTagsapplied.push(que);
                }
            })
        }
        res.status(200).json(afterTagsapplied);
        }
        else {

            res.status(200).json(afterDateapplied);}
        }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

//===============================================Fetch all filtered question=========================================
export const fetchFilteredQuestions=async (req, res) => {
    try {
        let user = await User.find();
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const tags = req.query.tags;

        const questions = await Question.find().populate('user', 'username');
        //console.log(questions);
        if (!questions) {
            return res.status(404).send("Question not Found");
        }

        const afterDateapplied = [];
        questions.map(que => {
            const year = que.date.getUTCFullYear();
            var month = que.date.getUTCMonth()+1;
            var day  = que.date.getUTCDate();
            
            if(month>='0' && month<='9') month = "0"+month;
            if(day>='0' && day<='9') day = "0"+day;
            
            const date = year+"-"+month+"-"+day;
            // console.log(date);
            // console.log(startDate);
            // console.log(endDate);

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(que);
            }

        })
        //console.log(afterDateapplied);
        const afterTagsapplied = [];
        if(tags){
        if(!startDate||!endDate)
            {
                questions.map(que => {
                    if(que.tags.split(" ").includes(tags)){
                        afterTagsapplied.push(que);
                    }
                })
            }
            else
            {
                afterDateapplied.map(que => {
                    if(que.tags.split(" ").includes(tags)){
                        afterTagsapplied.push(que);
                    }
                })
            }
            res.status(200).json(afterTagsapplied);
            }
            else {
    
                res.status(200).json(afterDateapplied);}
            }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}



//===============================================Fetch all used tags=========================================
export const usedTags= async(req, res)=>{
    try{
        const questions = await Question.find();

        const tags = [];

        questions.map(que => {
            que.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
            })
        })

        res.status(200).json(tags);
    }
    catch(e)
    {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
}


//===============================================Fetch all used tags by a user=========================================
export const usedUserTags= async(req, res)=>{
    try{
        
        let user = await User.findOne({ username: req.params.username });
        const questions = await Question.find({
            user: user._id
        });

        const tags = [];

        questions.map(que => {
            que.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
            })
        })
        res.status(200).json(tags);
    }
    catch(e)
    {
        res.status(400).send("Internal Server Error");
    }
}

//===============================================upvote a question=========================================
export const upvote= async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        const vote = question["votes"] + 1;

        const updatedAnswer = await Question.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.status(200).json({ "status": "upvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===============================================Downvote a question=========================================
export const downvote=async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        const vote = question["votes"] - 1;

        const updatedAnswer = await Question.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.status(200).json({ "status": "downvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===============================================fetch votes of a question=========================================
export const fetchVotes= async (req, res) => {
    const question = await Question.findById(req.params.id);

    if(question)
    {
        res.status(200).json(question.votes);
    }
    
}

//===============================================fetch all votes(for displaying)=========================================
export const fetchAllVotes= async (req, res) => {
    const allQuestion = await Question.find();
    const obj = {};

    allQuestion.map(que => {
        obj[que._id] = que.votes;
    })
    res.status(200).json(obj);
}

//===============================================fetch all answered question=========================================
export const answeredQuestions=async (req, res) => {

    const answers = await Answer.find();
    const questions = await Question.find().populate('user', 'username');

    let ansobj = {};


    answers.map(ans => {
        if (ansobj[ans.questionid] == null) {
            ansobj[ans.questionid] = 1;
        }
    })
    const answeredQuestion = [];

    questions.map(que => {
        if (ansobj[que._id] === 1) {
            answeredQuestion.push(que);
        }
    })

    res.status(200).json(answeredQuestion);
}

//===============================================fetch all unanswered question=========================================
export const unansweredQuestions=async (req, res) => {
    const answers = await Answer.find();
    const questions = await Question.find().populate('user', 'username');

    let ansobj = {};


    answers.map(ans => {
        if (ansobj[ans.questionid] == null) {
            ansobj[ans.questionid] = 1;
        }
    })
    const unansweredQuestion = [];

    questions.map(que => {
        if (ansobj[que._id] == null) {
            unansweredQuestion.push(que);
        }
    })

    res.status(200).json(unansweredQuestion);
}


//===============================================fetch all question on basis of months=========================================
export const questionByMonth=async (req, res) =>{
    try{
        const questions = await Question.aggregate([
            {
                $match: { date: { $exists: true } }
              },
            {
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 }
                }
            }
       ]);
       res.json(questions);
    }
    catch(e){
        console.log(e.message);
        res.status(500).send("internel server error");
    }
}

//===============================================fetch all question for a particular tag=========================================
export const questionTags = async (req, res) => {
    const tag=req.params.type;
    try {
        const regex = new RegExp(`\\b${tag}\\b`, 'i'); // Create a regex to match the tag as a word boundary, case-insensitive
        const questions = await Question.find({ tags: { $regex: regex } });
        res.status(200).json(questions.reverse());
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal server error");
    }
}