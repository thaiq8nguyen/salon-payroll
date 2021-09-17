import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";
import { authClient } from "../http";

const AddReceiptDialog = ({ open, technician, receiptItems, handleClose, handleSubmit }) => {
    const [initialValues, setInitialValues] = useState(null);
    useEffect(() => {
        const items = receiptItems.map((item) => {
            const result = { item_id: item.id, name: item.name, amount: "" };
            return result;
        });
        setInitialValues({ technician_id: technician.technician_id, items });
    }, [receiptItems]);

    return (
        <>
            {receiptItems.length && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add {technician.first_name}'s receipt</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            children={(props) => (
                                <AddReceiptForm {...props} handleClose={handleClose} />
                            )}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

const AddReceiptForm = ({ values, handleBlur, handleClose, handleSubmit, setFieldValue }) => {
    return (
        <>
            <Grid container spacing={2}>
                {values.items.map((receipt, index) => (
                    <Grid item xs={6} key={index}>
                        <TextField
                            id={receipt.name}
                            label={receipt.name.split("_").join(" ")}
                            name={receipt.name}
                            type="text"
                            value={receipt.amount}
                            onChange={(e) => {
                                setFieldValue(`items.${index}.amount`, e.target.value);
                            }}
                            onBlur={handleBlur}
                        />
                    </Grid>
                ))}
            </Grid>
            <DialogActions>
                <Button type="button" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </>
    );
};
export default AddReceiptDialog;
