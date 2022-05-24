import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Entry, EntryTypeString, EntryWithoutId, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntry, updatePatient, useStateValue } from "../state";
import EntryDetails from "../components/EntryDetails";
import React from "react";
import AddEntryModal from "../components/AddEntryModal";
import { Button } from "@mui/material";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";


const PatientPage = () => {
    const { id } = useParams<{ id: string}>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const [newEntryType, setNewEntryType] = React.useState<EntryTypeString>("Hospital");

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );

          dispatch(addEntry(newEntry, id as string));
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

    const handleEntryTypeChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const type = event.target.value as EntryTypeString;
        setNewEntryType(type);
    };

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
                    add entry
                </h3>
                <FormControl>
                    <FormLabel id="entry-type-group-label">Entry type</FormLabel>
                    <RadioGroup
                        onChange={handleEntryTypeChange}
                        row
                        aria-labelledby="entry-type-group-label"
                        defaultValue="Hospital"
                        name="entry-type-radio-group">
                            <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                            <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare"  />
                            <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check"  />
                    </RadioGroup>
                </FormControl>
                <br />
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                    entryType={newEntryType}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>
                
                <br />
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