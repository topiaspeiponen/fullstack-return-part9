import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { EntryWithoutId, HospitalEntry } from "../types";
import { isDate } from "../utils";

type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "Hospital",
            date: "",
            description: "",
            specialist: "",
            diagnosisCodes: Array<string>(),
            discharge: {
                date: "",
                criteria: ""
            }
        }}
        onSubmit={onSubmit}
        validate={(values : HospitalEntryFormValues) => {
            const requiredError = "Field is required";
            const formattingError = "Field is not in proper format";
            const errors: { [field: string]: string } = {};
            console.log(values);
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
            if (values.discharge && values.discharge.date) {
                if (!isDate(values.discharge.date)) {
                    errors['discharge.date'] = formattingError;
                }
            }
            if (values.discharge && !values.discharge.criteria) {
            errors["discharge.criteria"] = requiredError;
            }
            console.log(errors);
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
                <h3>Discharge</h3>
                <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
                />
                <Field
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
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

export default AddHospitalEntryForm;
