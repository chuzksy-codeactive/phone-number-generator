import phoneBookController from '../controllers/phoneBookController';
import express from 'express';

const app = express();
const router = express.Router();

router.get('/phone-numbers', phoneBookController.getPhoneNumbers);
router.post('/phone-numbers-list', phoneBookController.savePhoneNumbersToFile);

export default router;