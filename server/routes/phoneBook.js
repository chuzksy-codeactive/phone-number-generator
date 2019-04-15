import express from 'express';
import phoneBookController from '../controllers/phoneBookController';

const router = express.Router();

router.get('/phone-numbers', phoneBookController.getPhoneNumbers);
router.post('/phone-numbers-list', phoneBookController.savePhoneNumbersToFile);
router.delete('/clear-phone-numbers', phoneBookController.clearCSVFile);

export default router;
