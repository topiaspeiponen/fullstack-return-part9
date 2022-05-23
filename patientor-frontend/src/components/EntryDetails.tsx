import { Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { assertNever } from "../utils";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';

const EntryDetails : React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryBlock entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalEntryBlock entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthEntryBlock entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

const HospitalEntryBlock = ({entry, diagnoses} : {entry: HospitalEntry, diagnoses: Diagnosis[]}) => {
    return (
        <div style={BlockStyle}>
            <div>
                {entry.date}
                <ApartmentIcon />
            </div>
            <i>
                {entry.description}
            </i>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
                    const matchingNameForCode = Object.values(diagnoses).find(diagnosis => {
                        if (diagnosis.code === code) {
                            return diagnosis;
                        }
                    });

                    return (
                        <li key={`${code}${index}`}>
                            {code} {matchingNameForCode && matchingNameForCode.name}
                        </li>
                    );
            })}
            <div>
                diagnosed by {entry.specialist}
            </div>
        </div>
    );
};

const OccupationalEntryBlock = ({entry, diagnoses} : {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
    return (
        <div style={BlockStyle}>
            <div>
                {entry.date}
                <WorkIcon />
            </div>
            <i>
                {entry.description}
            </i>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
                    const matchingNameForCode = Object.values(diagnoses).find(diagnosis => {
                        if (diagnosis.code === code) {
                            return diagnosis;
                        }
                    });

                    return (
                        <li key={`${code}${index}`}>
                            {code} {matchingNameForCode && matchingNameForCode.name}
                        </li>
                    );
            })}
            <div>
                diagnosed by {entry.specialist}
            </div>
        </div>
    );
};

const HealthEntryBlock = ({entry, diagnoses} : {entry: HealthCheckEntry, diagnoses: Diagnosis[]}) => {
    const renderHealthCheckResult = (rating: HealthCheckRating) => {
        switch(rating) {
            case HealthCheckRating.CriticalRisk:
                return <FavoriteIcon htmlColor="red" />;
            case HealthCheckRating.HighRisk:
                return <FavoriteIcon htmlColor="orange" />;
            case HealthCheckRating.LowRisk:
                return <FavoriteIcon htmlColor="yellow" />;
            case HealthCheckRating.Healthy:
                return <FavoriteIcon htmlColor="green" />;
            default:
                return <FavoriteIcon />;
        }
    };

    return (
        <div style={BlockStyle}>
            <div>
                {entry.date}
                <LocalHospitalIcon />
            </div>
            <i>
                {entry.description}
            </i>
            <div>
                {renderHealthCheckResult(entry.healthCheckRating)}
            </div>
            {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => {
                    const matchingNameForCode = Object.values(diagnoses).find(diagnosis => {
                        if (diagnosis.code === code) {
                            return diagnosis;
                        }
                    });

                    return (
                        <li key={`${code}${index}`}>
                            {code} {matchingNameForCode && matchingNameForCode.name}
                        </li>
                    );
            })}
            <div>
                diagnosed by {entry.specialist}
            </div>
        </div>
    );
};

const BlockStyle = {
    border: 'solid',
    borderWidth: '1px'
};

export default EntryDetails;