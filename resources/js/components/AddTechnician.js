import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";
import { authClient } from "../http";
const AddTechnician = ({ open, handleClose, handleAddCompleted }) => {
    const handleSubmit = async (technician) => {
        try {
            const newTechnician = await authClient.post(
                "/technicians",
                technician
            );

            handleAddCompleted(newTechnician.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            first_name: "",
                            last_name: "",
                            email: "",
                            phone_number: "",
                            is_active: true,
                            is_contractor: false,
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <NewTechnicianForm
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
const NewTechnicianForm = ({
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
                        name="first_name"
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
                <Grid item xs={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.is_contractor}
                                id="is_contractor"
                                name="is_contractor"
                                onChange={handleChange}
                            />
                        }
                        label="Is contractor ?"
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

export default AddTechnician;
