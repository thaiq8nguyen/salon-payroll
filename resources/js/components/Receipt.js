import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";
import { authClient } from "../http";
import AddReceiptDialog from "./AddReceiptDialog";

import ReceiptStaging from "../components/ReceiptStaging";
import { data } from "jquery";

const Receipt = ({ date }) => {
    const [existingReceipts, setExistingReceipts] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [technician, setTechnician] = useState(null);
    const [addReceiptDialog, setAddReceiptDialog] = useState(false);
    const [editReceiptDialog, setEditReceiptDialog] = useState(false);
    const [receiptItems, setReceiptItems] = useState([]);
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        const getReceiptItems = async () => {
            const receiptItems = await authClient.get(
                "items?name=sale_receipt,tip_receipt"
            );
            setReceiptItems(receiptItems.data.data);
        };

        getReceiptItems();
    }, []);

    useEffect(() => {
        const getExistingReceipts = async () => {
            if (date) {
                const result = await authClient.get(`receipts?date=${date}`);
                setExistingReceipts(result.data.data);
            }
        };

        getExistingReceipts();
    }, [date]);

    useEffect(() => {
        const getTechnicians = async () => {
            const result = await authClient.get("technicians");
            setTechnicians(result.data.data);
        };

        getTechnicians();
    }, []);

    useEffect(() => {
        const result = technicians.map((technician) => {
            const index = existingReceipts.findIndex(
                (existingReceipt) =>
                    existingReceipt["technician_id"] === technician["id"]
            );

            const { items } = index !== -1 ? existingReceipts[index] : {};
            return { ...technician, items };
        });
        setTechnicians(result);
    }, [existingReceipts]);

    const AddReceiptCard = ({ technician }) => {
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography>{technician.first_name}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            onClick={() => {
                                setTechnician(technician);
                                setAddReceiptDialog(true);
                            }}
                        >
                            Add Receipt
                        </Button>
                    </CardActions>
                </Card>
            </>
        );
    };

    const EditReceiptCard = ({ technician }) => {
        return (
            <Card>
                <CardContent>
                    <Typography>{technician.first_name}</Typography>
                </CardContent>

                {technician.items.map((item) => (
                    <CardContent key={item.item_id}>
                        <Typography>
                            {item.name}: ${item.amount}
                        </Typography>
                    </CardContent>
                ))}

                <CardActions>
                    <Button
                        color="primary"
                        onClick={() => {
                            setTechnician(technician);
                            setEditReceiptDialog(true);
                        }}
                    >
                        Edit Sale
                    </Button>
                </CardActions>
            </Card>
        );
    };

    const handleAddReceipt = (newReceipt) => {
        console.log(newReceipt);
        newReceipt.date = date;
        const technician = technicians.find(
            (technician) => technician.id === newReceipt.technician_id
        );
        technician.items = newReceipt.items;

        setReceipts((receipts) => [...receipts, newReceipt]);
        setTechnician(null);
        setAddReceiptDialog(false);
    };

    const handleEditReceipt = (editedReceipt) => {
        const technician = technicians.find(
            (technician) => technician.id === editedReceipt.technician_id
        );
        technician.receipts = editedReceipt.receipts;

        const editedReceipts = {
            ...allReceipts,
            data: receipts.technicianReceipts.map((technicianReceipt) =>
                technicianReceipt.technician_id === editedReceipt.technician_id
                    ? editedReceipt
                    : technicianReceipt
            ),
        };

        setAllReceipts(editedReceipts);
        setTechnician(null);
        setEditReceiptDialog(false);
    };

    const handleDeleteReceipt = (technicianId) => {
        const technician = technicians.find(
            (technician) => technician.id === technicianId
        );

        delete technician.receipts;

        const deletedReceipts = receipts.technicianReceipts.filter(
            (technicianReceipt) =>
                technicianReceipt.technician_id !== technicianId
        );

        setAllReceipts({ date, data: deletedReceipts });
        setTechnician(null);
        setEditReceiptDialog(false);
    };

    const handleSubmit = async () => {
        const response = await authClient.post("receipts", { receipts });
        console.log("response ", response.data.data);
        setReceipts([]);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {technicians.length > 0 && (
                        <Grid container spacing={2}>
                            {technicians.map((technician) => (
                                <Grid item key={technician.id}>
                                    {technician.items ? (
                                        <EditReceiptCard
                                            technician={technician}
                                        />
                                    ) : (
                                        <AddReceiptCard
                                            technician={technician}
                                        />
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {receipts.length > 0 && (
                        <ReceiptStaging
                            receipts={receipts}
                            technicians={technicians}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </Grid>
            </Grid>

            {technician && (
                <AddReceiptDialog
                    open={addReceiptDialog}
                    technician={technician}
                    receiptItems={receiptItems}
                    handleClose={() => {
                        setAddReceiptDialog(false), setTechnician(null);
                    }}
                    handleSubmit={handleAddReceipt}
                />
            )}
        </>
    );
};

export default Receipt;
