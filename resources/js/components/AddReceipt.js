import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik, Field, FieldArray } from "formik";

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
                <DialogTitle>Add {technician.first_name}'s receipt</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            technician_id: technician.id,
                            receipts: [
                                {
                                    item_id: receiptItems.find(
                                        (item) => item.name === "sale_receipt"
                                    ).id,
                                    name: "sale_receipt",
                                    amount: "",
                                },
                                {
                                    item_id: receiptItems.find(
                                        (item) => item.name === "tip_receipt"
                                    ).id,
                                    name: "tip_receipt",
                                    amount: "",
                                },
                            ],
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
    handleClose,
    handleSubmit,
    setFieldValue,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                {values.receipts.map((receipt, index) => (
                    <Grid item xs={6} key={index}>
                        <TextField
                            id={receipt.name}
                            label={receipt.name.split("_").join(" ")}
                            name={receipt.name}
                            type="text"
                            value={receipt.amount}
                            onChange={(e) => {
                                setFieldValue(
                                    `receipts.${index}.amount`,
                                    e.target.value
                                );
                            }}
                            onBlur={handleBlur}
                        />
                    </Grid>
                ))}
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
