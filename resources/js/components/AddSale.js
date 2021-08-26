import React from "react";
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

const AddSale = ({ technician, open, handleClose, handleSubmit }) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add {technician.first_name}'s sale</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            technician_id: technician.id,
                            sale_amount: "",
                            tip_amount: "",
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <AddSaleForm {...props} handleClose={handleClose} />
                        )}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

const AddSaleForm = ({
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
                        id="sale_amount"
                        label="Sale amount"
                        name="sale_amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.sale_amount}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="tip_amount"
                        label="Tip amount"
                        name="tip_amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.tip_amount}
                    />
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </>
    );
};
export default AddSale;
