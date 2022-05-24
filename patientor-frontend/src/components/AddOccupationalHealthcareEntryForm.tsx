import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { isDate } from "../utils";


type EntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}



export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "OccupationalHealthcare",
            date: "",
            description: "",
            specialist: "",
            diagnosisCodes: Array<string>(),
            employerName: "",
            sickLeave: {
                startDate: "",
                endDate: ""
            }
        }}
        onSubmit={onSubmit}
        validate={(values : EntryFormValues) => {
            const requiredError = "Field is required";
            const formattingError = "Field is not in proper format";
            const errors: { [field: string]: string } = {};

            if (values.date) {
                if (!isDate(values.date)) {
                    errors.date = formattingError;
                }
            } else {
                errors.date = requiredError;
            }
            
            if (!values.description) {
            errors.description = requiredError;
            }
            if (!values.specialist) {
            errors.specialist = requiredError;
            }
            if (!values.employerName) {
            errors.employerName = requiredError;
            }

            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
            <Form className="form ui">
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
                />
                <h3>Sick leave</h3>
                <Field
                label="Start date"
                placeholder="Start date"
                name="sickLeave.startDate"
                component={TextField}
                />
                <Field
                label="End date"
                placeholder="End date"
                name="sickLeave.endDate"
                component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnoses)}
                />    
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
        }}
        </Formik>
    );
};

export default AddOccupationalHealthcareEntryForm;
