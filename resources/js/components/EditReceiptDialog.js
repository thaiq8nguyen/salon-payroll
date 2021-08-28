import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";

const EditReceiptDialog = ({
    technician,
    receiptItems,
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
    receipts,
    handleBlur,
    handleClose,
    handleSubmit,
    handleDelete,
    setFieldValue,
}) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        Current
                    </Typography>
                    {receipts.map((receipt) => (
                        <Typography key={receipt.item_id}>
                            {receipt.name}: ${receipt.amount}
                        </Typography>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        New
                    </Typography>
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
