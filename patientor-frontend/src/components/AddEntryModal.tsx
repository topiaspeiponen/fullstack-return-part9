import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {AddHealthCheckEntryForm} from "./AddHealthCheckEntryForm";
import { EntryTypeString, EntryWithoutId } from "../types";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  entryType: EntryTypeString;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryType }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new {entryType} entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      {entryType === "HealthCheck" && 
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
      {entryType === "Hospital" && 
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
      {entryType === "OccupationalHealthcare" && 
        <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
      }
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
