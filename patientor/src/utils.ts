import { EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./types";

const isString = (text: unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (str : any) : str is Gender=> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(str);
};
  
const parseDate = (date: unknown) : string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missign date ' + date);
    }
    return date;
};

const parseName = (name: unknown) : string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown) : string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseOccupation = (occupation: unknown) : string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseGender = (gender: unknown) : Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = (object : Fields) : NewPatient => {
    const newPatient : NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newPatient;
};

export const toNewEntry = (object : EntryWithoutId) : EntryWithoutId => {
    switch (object.type) {
        case "Hospital":
            if (!object.date) {
                throw new Error('Incorrect or missing date');
            }
            if (!object.description) {
                throw new Error('Incorrect or missing description');
            }
            if (!object.discharge || !object.discharge.date || !object.discharge.criteria) {
                throw new Error('Incorrect or missing discharge information');
            }
            if (!object.specialist) {
                throw new Error('Incorrect or missing specialist');
            }

            const hospitalEntry : EntryWithoutId = {
                type: "Hospital",
                date: object.date,
                description: object.description,
                discharge: object.discharge,
                specialist: object.specialist
            };

            if (object.diagnosisCodes) {
                hospitalEntry['diagnosisCodes'] = object.diagnosisCodes;
            }
            return hospitalEntry;
        case "HealthCheck":
            if (!object.date) {
                throw new Error('Incorrect or missing date');
            }
            if (!object.description) {
                throw new Error('Incorrect or missing description');
            }
            if (!object.healthCheckRating || !Object.values(HealthCheckRating).includes(Number(object.healthCheckRating))) {
                throw new Error('Incorrect or missing health check rating');
            }
            if (!object.specialist) {
                throw new Error('Incorrect or missing specialist');
            }

            const healthcheckEntry : EntryWithoutId = {
                type: "HealthCheck",
                date: object.date,
                description: object.description,
                healthCheckRating: object.healthCheckRating,
                specialist: object.specialist
            };

            if (object.diagnosisCodes) {
                healthcheckEntry['diagnosisCodes'] = object.diagnosisCodes;
            }
            return healthcheckEntry;
        case "OccupationalHealthcare":
            if (!object.date) {
                throw new Error('Incorrect or missing date');
            }
            if (!object.description) {
                throw new Error('Incorrect or missing description');
            }
            if (!object.employerName) {
                throw new Error('Incorrect or missing employer name');
            }
            if (!object.specialist) {
                throw new Error('Incorrect or missing specialist');
            }

            const occupationalEntry : EntryWithoutId = {
                type: "OccupationalHealthcare",
                date: object.date,
                description: object.description,
                employerName: object.employerName,
                specialist: object.specialist
            };

            if (object.diagnosisCodes) {
                occupationalEntry['diagnosisCodes'] = object.diagnosisCodes;
            }
            if (object.sickLeave && object.sickLeave.endDate && object.sickLeave.startDate) {
                occupationalEntry['sickLeave'] = object.sickLeave;
            }

            return occupationalEntry;
        default:
            throw new Error('Received entry was invalid');
    }
};