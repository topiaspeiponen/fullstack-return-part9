import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients : Array<Patient> = patientsData;

const getPatients = () : Array<Patient> => {
    return patients;
};

const getNonSensitivePatients = () : Array<NonSensitivePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient : NewPatient) : Patient => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId : string, entry : EntryWithoutId)  : Entry | undefined => {
    const newEntry = {
        id: uuid(),
        ...entry
    };

    patients.map(patient => {
        if (patient.id === patientId) {
            return {
                ...patient,
                entries: patient.entries.push(newEntry)
            };
        }
        return patient;
    });
    return newEntry;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    return patient;
};

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    addEntry,
    findById
};