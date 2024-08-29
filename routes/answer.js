import {Router} from 'express';
import {addAnswer,fetchAnswer,fetchOneAnswer,fetchAnswerById,updateAnswer,fetchOneUserAnswer,
    fetchUserFilteredAnswers,fetchAllFilteredAnswers,givenAllAnswersTags,givenAnswersTags,fetchUserAnsweredQuestions,
    findNumberOfAnswer,upvote,downvote,fetchVotes,deleteAnswer
} from '../controllers/answer.controller.js';
import {authenticateToken} from "../middleware/jwt.middleware.js"

const router= Router();

router.route('/addanswer/:id').post(authenticateToken,addAnswer);
router.route('/fetchanswer').get(fetchAnswer);
router.route('/fetchanswer/:id').get(fetchOneAnswer);
router.route('/fetchAnswerById/:id').get(fetchAnswerById);
router.route('/updateanswer/:id').put(updateAnswer);
router.route('/fetchUserAnswers/:username').get(authenticateToken,fetchOneUserAnswer);
router.route('/fetchUserFilteredAnswers').get(authenticateToken,fetchUserFilteredAnswers);
router.route('/fetchAllFilteredAnswers').get(authenticateToken,fetchAllFilteredAnswers);
router.route('/givenAllAnswersTags').get(givenAllAnswersTags);
router.route('/givenAnswersTags/:username').get(givenAnswersTags);
router.route('/fetchUserAnsweredQuestions').get(authenticateToken,fetchUserAnsweredQuestions);
router.route('/findNumberOfAnswer').get(findNumberOfAnswer);
router.route('/upvote/:id').put(upvote);
router.route('/fetchVotes').get(fetchVotes);
router.route('/downvote/:id').put(downvote);
router.route('/deleteanswer/:id').delete(authenticateToken,deleteAnswer);
export default router;
