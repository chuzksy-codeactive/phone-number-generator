import express from 'express';
import phoneBookController from '../controllers/phoneBookController';

const app = express();
const router = express.Router();

router.get('/phone-numbers', phoneBookController.getPhoneNumbers);
router.post('/phone-numbers-list', phoneBookController.savePhoneNumbersToFile);

export default router;
