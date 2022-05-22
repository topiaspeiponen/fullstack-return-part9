import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getNonSensitivePatients();
    console.log('patients called ', patients)
    res.json(patients);
});


export default router;