import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik } from "formik";
import { authClient } from "../http";

const EditReceiptDialog = ({
    open,
    receiptItems,
    technician,
    handleDelete,
    handleEdit,
    handleClose
}) => {
    const handleSubmit = async (receipt) => {
        const receipts = [];
        receipts.push(receipt);
        const response = await authClient.put("receipts", { receipts });
        handleEdit(response.data.data[0]);
    };

    const handleDeleteSubmit = async (receiptId) => {
        const receipts = [];
        receipts.push({ receipt_id: receiptId });
        const response = await authClient.delete("receipts", { data: { receipts } });
        handleDelete(response.data.data[0]);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {technician.first_name}'s sale</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            receipt_id: technician.receipt_id,
                            items: [
                                {
                                    item_id: receiptItems.find(
                                        (item) => item.name === "sale_receipt"
                                    ).id,
                                    name: "sale_receipt",
                                    amount: 0
                                },
                                {
                                    item_id: receiptItems.find(
                                        (item) => item.name === "tip_receipt"
                                    ).id,
                                    name: "tip_receipt",
                                    amount: 0
                                }
                            ]
                        }}
                        onSubmit={handleSubmit}
                        children={(props) => (
                            <EditSaleForm
                                {...props}
                                {...technician}
                                handleClose={handleClose}
                                handleDelete={handleDeleteSubmit}
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
    items,
    handleBlur,
    handleClose,
    handleSubmit,
    handleDelete,
    setFieldValue
}) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        Current
                    </Typography>
                    {items.map((item) => (
                        <Typography key={item.item_id}>
                            {item.name}: ${item.amount}
                        </Typography>
                    ))}
                </Grid>
                <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                        New
                    </Typography>
                    <Grid container spacing={2}>
                        {values.items.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <TextField
                                    id={item.name}
                                    label={item.name.split("_").join(" ")}
                                    name={item.name}
                                    type="number"
                                    value={item.amount}
                                    onChange={(e) => {
                                        setFieldValue(`items.${index}.amount`, e.target.value);
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
                    type="button"
                    onClick={() => handleDelete(values.receipt_id)}
                >
                    Delete
                </Button>
                <Button onClick={handleClose}>Close</Button>
                <Button color="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </>
    );
};
export default EditReceiptDialog;
