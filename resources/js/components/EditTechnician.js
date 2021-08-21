import React, { useRef } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";
import { authClient } from "../http";
const EditTechnician = ({
    technician,
    open,
    handleClose,
    handleEditCompleted,
}) => {
    const handleSubmit = async (changes) => {
        try {
            const editedTechnician = await authClient.put(
                `/technicians/${technician.id}`,
                changes
            );

            handleEditCompleted(editedTechnician.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            first_name: technician.first_name,
                            last_name: technician.last_name,
                            email: technician.email,
                            phone_number: technician.phone_number,
                            is_active: technician.is_active,
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <EditTechnicianForm
                                {...props}
                                handleClose={handleClose}
                            />
                        )}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

const EditTechnicianForm = ({
    values,
    handleBlur,
    handleChange,
    handleClose,
    handleSubmit,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        id="first_name"
                        label="First name"
                        name="firstName"
                        type="text"
                        value={values.first_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="last_name"
                        label="Last name"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="phone_number"
                        label="Phone number"
                        name="phone_number"
                        type="text"
                        value={values.phone_number || ""}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.is_active}
                                id="is_active"
                                name="is_active"
                                onChange={handleChange}
                            />
                        }
                        label="Is active ?"
                    />
                </Grid>
            </Grid>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </>
    );
};
export default EditTechnician;
