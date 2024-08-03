import User from "../models/user.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";

//===================================post an answer=================================================
export const addAnswer = async (req, res) => {
    try {
        //console.log(req.params.id);
        
        let user = await User.findOne({ email: req.body.user.email });
        //console.log(user);
        let newanswer = await Answer.create({
            questionid: req.params.id,
            answer: req.body.answer,
            postedId: user._id,
            postedBy: user.username, 
            votes: 0
        })
        //console.log(newanswer);
        res.status(200).json({ "Success": "Added Answer Successfully"})
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send("Internal Server Error");
    }
}



//===================================fetch all answers=================================================
export const fetchAnswer = async (req, res) => {
    try {
        const answers = await Answer.find();
        res.status(200).json(answers);
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}



//===================================fetch answers of a particular question===========================================
export const fetchOneAnswer = async (req, res) => {
    try {
        const answers = await Answer.find({ questionid: req.params.id });
        res.status(200).json(answers);
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}


//===================================fetch a single answer by its ID===========================================
export const fetchAnswerById =async (req, res)=>{
    try{
        const answer = await Answer.findOne({_id: req.params.id});
        res.status(200).json(answer);
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}


//===================================update an answer===========================================
export const updateAnswer =async (req, res)=>{
    try{
        const answer = await Answer.findByIdAndUpdate(req.params.id, {$set: {answer: req.body.answer}});

        res.status(200).json({status: "updated"});
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===================================fetch answers of a user===========================================
export const fetchOneUserAnswer = async (req, res) => {
    try {

        const answers = await Answer.find({ postedBy: req.params.username });
        // console.log(answers);

        if (!answers) {
            return res.status(404).send("Question not Found");
        }

        res.status(200).json(answers);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

// This is for filtering answeres based on Date,tag and status
//===================================fetch filtered answer of a user===========================================
export const fetchUserFilteredAnswers =async (req, res) => {
    try {

        const answers = await Answer.find({ postedBy: req.query.username });
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const tags = req.query.tags;

        if (!answers) {
            return res.status(404).send("Answers not Found");
        }

        const afterDateapplied = [];
        answers.map(ans => {
            const year = ans.date.getUTCFullYear();
            var month = ans.date.getUTCMonth() + 1;
            var day = ans.date.getUTCDate();

            if (month >= '0' && month <= '9') month = "0" + month;
            if (day >= '0' && day <= '9') day = "0" + day;

            const date = year + "-" + month + "-" + day;

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(ans);
            }
        })

        const afterTagsapplied = [];
        var tagAppiled = false;
        if (tags) {
            if(!startDate||!endDate)
            {
                for (let i = 0; i < answers.length; i++) {
                    const que = await Question.find({ _id: answers[i].questionid });
                    if (que[0]?.tags.split(" ").includes(tags)) {
                        afterTagsapplied.push(answers[i]);
                    }
                }
            }
            else
            {
                for (let i = 0; i < afterDateapplied.length; i++) {
                    const que = await Question.find({ _id: afterDateapplied[i].questionid });
                    if (que[0]?.tags.split(" ").includes(tags)) {
                        afterTagsapplied.push(afterDateapplied[i]);
                    }
                }
            }
            tagAppiled = true;
        }        
        if (tagAppiled)
            res.status(200).json(afterTagsapplied);
        else {
            res.status(200).json(afterDateapplied);
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}
//===================================fetch filtered answers of all users===========================================
export const fetchAllFilteredAnswers = async (req, res) => {
    try {

        const answers = await Answer.find();

        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const tags = req.query.tags;

        if (!answers) {
            return res.status(404).send("Answers not Found");
        }

        const afterDateapplied = [];
        answers.map(ans => {
            const year = ans.date.getUTCFullYear();
            var month = ans.date.getUTCMonth() + 1;
            var day = ans.date.getUTCDate();

            if (month >= '0' && month <= '9') month = "0" + month;
            if (day >= '0' && day <= '9') day = "0" + day;

            const date = year + "-" + month + "-" + day;

            if (date >= startDate && date <= endDate) {
                afterDateapplied.push(ans);
            }
        })

        const afterTagsapplied = [];
        var tagAppiled = false;
        if (tags) {
        if(!startDate||!endDate)
        {
            for (let i = 0; i < answers.length; i++) {
                const que = await Question.find({ _id: answers[i].questionid });
                if (que[0]?.tags.split(" ").includes(tags)) {
                    afterTagsapplied.push(answers[i]);
                }
            }
        }
        else
        {
            for (let i = 0; i < afterDateapplied.length; i++) {
                const que = await Question.find({ _id: afterDateapplied[i].questionid });
                if (que[0]?.tags.split(" ").includes(tags)) {
                    afterTagsapplied.push(afterDateapplied[i]);
                }
            }
        }
            tagAppiled = true;
        }    
        if (tagAppiled)
            res.status(200).json(afterTagsapplied);
        else {
            res.status(200).json(afterDateapplied);
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}

//===================================fetch all the tagsr===========================================
export const givenAllAnswersTags = async (req, res) => {
    try {
        const answers = await Answer.find();

        const questions = [];

        for (const answer of answers) {
            const question = await Question.findById(answer.questionid);
            if(question)
            questions.push(question);
        }
        const tags = [];

        questions.map(question => {         
            question.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
                //console.log(tag);
            });

        });

        res.status(200).json(tags);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}


//===================================fetch all tags of a user===========================================
export const givenAnswersTags = async (req, res) => {
    try {
        const answers = await Answer.find({ postedBy: req.params.username });

        const questions = [];

        for (const answer of answers) {
            const question = await Question.findById(answer.questionid);
            if(question)
            questions.push(question);
        }
        //console.log(questions);
        const tags = [];

        questions.map(question => {         
            question.tags.split(" ").map(tag => {
                if (tags.indexOf(tag)==-1) tags.push(tag);
                //console.log(tag);
            });

        });
        //console.log(tags);

        res.status(200).json(tags);
    } catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}


//===================================fetch the questions anwered by a user===========================================
export const fetchUserAnsweredQuestions = async (req, res) => {
    try {

        const answers = await Answer.find({ postedBy: req.query.username });

        const questions = [];
        for (const answer of answers) {
            const question = await Question.find({ _id: answer.questionid });
            if(question.length!==0)
            questions.push(question);
        }

        if (questions.length===0) {
            return res.status(404).send("Question not Found");
        }

        res.status(200).json(questions);
    }
    catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}


//===================================fetch the total number of answers===========================================
export const findNumberOfAnswer = async (req, res) => {
    try {
        const answers = await Answer.find();

        let obj = {};

        answers.map(answer => {

            if (obj[answer.questionid] == null) {
                obj[answer.questionid] = 1;
            }
            else {
                obj[answer.questionid] += 1;
            }

        })

        res.status(200).json(obj);
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===================================upvote an answer===========================================
export const upvote =async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        const vote = answer["votes"] + 1;

        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.status(200).json({ "status": "upvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===================================fetch number of votes an answer===========================================
export const fetchVotes = async (req, res) => {
    const allAnswers = await Answer.find();
    const obj = {};

    allAnswers.map(ans => {
        obj[ans._id] = ans.votes;
    })
    res.status(200).json(obj);
}

//===================================downvote an answer===========================================
export const downvote = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);

        const vote = answer["votes"] - 1;

        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, { $set: { "votes": vote } });

        res.status(200).json({ "status": "downvoted" });
    }

    catch (e) {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}

//===================================delete an answer===========================================
export const deleteAnswer = async(req, res)=>{
    try{
        await Answer.deleteOne({_id : req.params.id});

        res.status(200).json({"status":"deleted"})
    }
    catch(e)
    {
        console.log(e.message);
        res.status(400).send("Internal Server Error");
    }
}
