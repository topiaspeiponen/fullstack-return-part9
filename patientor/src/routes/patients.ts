import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getNonSensitivePatients();
    console.log('patients called ', patients);
    res.json(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);
    
    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        console.log('post patient');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        console.log('post entries ', req.body, req.params.id);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch(error: unknown) {
        console.log('mitä');
        console.error(error);
    }
});

export default router;