import {Router} from 'express';
import {questionTags,questionByMonth,addQuestion,fetchQuestions,fetchAllVotes,fetchFilteredQuestions,fetchQuestionsByHigherVotes,fetchQuestionsById,fetchUserFilteredQuestions,fetchUserQuestions,fetchVotes,updateQuestion,upvote,usedTags,unansweredQuestions,usedUserTags,deleteQuestion,downvote,answeredQuestions} from '../controllers/question.controller.js';
import {authenticateToken} from "../middleware/jwt.middleware.js"

const router= Router();

router.route('/addquestion').post(authenticateToken,addQuestion);
router.route('/fetchquestions').get(fetchQuestions);
router.route('/fetchQuestionsByHigherVotes').get(fetchQuestionsByHigherVotes);
router.route('/fetchQuestionsById/:id').get(fetchQuestionsById);
router.route('/updatequestion/:id').put(updateQuestion);
router.route('/deletequestion/:id').delete(authenticateToken,deleteQuestion);
router.route('/fetchFilteredQuestions').get(authenticateToken,fetchFilteredQuestions);
router.route('/fetchUserQuestions').get(authenticateToken,fetchUserQuestions);
router.route('/fetchUserFilteredQuestions').get(authenticateToken,fetchUserFilteredQuestions);
router.route('/usedtags').get(usedTags);
router.route('/usedtags/:username').get(authenticateToken,usedUserTags);
router.route('/upvote/:id').put(upvote);
router.route('/downvote/:id').put(downvote);
router.route('/fetchVotes/:id').get(fetchVotes);
router.route('/fetchallVotes').get(fetchAllVotes);
router.route('/answeredQuestions').get(answeredQuestions);
router.route('/unansweredQuestions').get(unansweredQuestions);
router.route('/questionByMonth').get(authenticateToken,questionByMonth);
router.route('/questionOntags/:type').get(questionTags);


export default router;
