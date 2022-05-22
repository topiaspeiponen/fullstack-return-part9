import express from 'express';
import diagnosesService from '../services/diagnosesService';
// import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses = diagnosesService.getDiagnoses();
    res.json(diagnoses);
});


export default router;