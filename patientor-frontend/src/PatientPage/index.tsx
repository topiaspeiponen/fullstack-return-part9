import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import EntryDetails from "../components/EntryDetails";


const PatientPage = () => {
    const { id } = useParams<{ id: string}>();

    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const patientToView = Object.values(patients).find(patient => patient.id === id);

    useEffect(() => {
        try {
            void axios.get<Patient>(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${apiBaseUrl}/patients/${id}`
            ).then((response) => {
                dispatch(updatePatient(response.data));
            });
        } catch(e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
              } else {
                console.error("Unknown error", e);
              }
        }
    }, []);

    if (!patientToView) {
        return null;
    } else {
        return (
            <div>
                <h2>
                    {patientToView.name}
                </h2>
                <div>
                    gender: {patientToView.gender}
                </div>
                <div>
                    ssn: {patientToView.ssn}
                </div>
                <div>
                    occupation: {patientToView.occupation}
                </div>

                <h3>
                    entries
                </h3>
                {patientToView.entries && patientToView.entries.map((entry, index) => {
                    return (
                        <EntryDetails key={`${entry.id} ${index}`} entry={entry} diagnoses={Object.values(diagnoses)}/>
                    );
                })}
            </div>
        );
    }
};

export default PatientPage;