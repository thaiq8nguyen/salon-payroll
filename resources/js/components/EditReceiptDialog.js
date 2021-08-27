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
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";

const EditReceiptDialog = ({
    technician,
    open,
    handleClose,
    handleSubmit,
    handleDelete,
}) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {technician.first_name}'s sale</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            technician_id: technician.id,
                            sale_amount: "",
                            tip_amount: "",
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <EditSaleForm
                                {...props}
                                {...technician}
                                handleClose={handleClose}
                                handleDelete={handleDelete}
                            />
                        )}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

const EditSaleForm = ({
    values,
    sale_amount,
    tip_amount,
    handleBlur,
    handleChange,
    handleClose,
    handleSubmit,
    handleDelete,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        Current
                    </Typography>
                    <Typography>Sale : ${sale_amount}</Typography>
                    {tip_amount && <Typography>Tip : ${tip_amount}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        New
                    </Typography>
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
                </Grid>
            </Grid>
            <DialogActions>
                <Button
                    color="secondary"
                    onClick={() => handleDelete(values.technician_id)}
                >
                    Delete
                </Button>
                <Button onClick={handleClose}>Close</Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </>
    );
};
export default EditReceiptDialog;
