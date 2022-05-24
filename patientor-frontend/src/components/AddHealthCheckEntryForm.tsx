import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, SelectField, DiagnosisSelection, HealthCheckRatingOption } from "../AddPatientModal/FormField";
import { EntryWithoutId, HealthCheckEntry, HealthCheckRating } from "../types";
import { isDate } from "../utils";

type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
    { value: HealthCheckRating.HighRisk, label: "High risk" },
    { value: HealthCheckRating.LowRisk, label: "Low risk" },
    { value: HealthCheckRating.Healthy, label: "Healthy" }
  ];

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            type: "HealthCheck",
            date: "",
            description: "",
            specialist: "",
            diagnosisCodes: Array<string>(),
            healthCheckRating: HealthCheckRating.Healthy
        }}
        onSubmit={onSubmit}
        validate={(values : HealthCheckEntryFormValues) => {
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
            if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
            errors.healthCheckRating = requiredError;
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
                <SelectField label="Health check rating" name="healthCheckRating" options={healthCheckRatingOptions} />
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

export default AddHealthCheckEntryForm;
