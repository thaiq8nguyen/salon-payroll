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

const AddReceipt = ({
    technician,
    open,
    receiptItems,
    handleClose,
    handleSubmit,
}) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add {technician.first_name}'s sale</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            technician_id: technician.id,
                            receipt_sale_amount: "",
                            receipt_tip_amount: "",
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <AddReceiptForm
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

const AddReceiptForm = ({
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
                        label="Receipt sale amount"
                        name="receipt_sale_amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.receipt_sale_amount}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="tip_amount"
                        label="Receipt tip amount"
                        name="receipt_tip_amount"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="number"
                        value={values.receipt_tip_amount}
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
export default AddReceipt;
