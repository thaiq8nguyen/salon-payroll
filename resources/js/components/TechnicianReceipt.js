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

const TechnicianReceipt = ({ date }) => {
    const [allReceipts, setAllReceipts] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const getAllReceipts = async () => {
            if (date) {
                const result = await authClient.get(
                    `all-receipts/?date=${date}`
                );
                setAllReceipts(result.data.data);
            }
        };

        getAllReceipts();
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
            const index = allReceipts.findIndex(
                (receipt) => receipt["technician_id"] === technician["id"]
            );
            const { receipt_items } = index !== -1 ? allReceipts[index] : {};

            return { ...technician, receipt_items };
        });
        setTechnicians(result);
    }, [allReceipts]);

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

                {technician.receipt_items.map((receiptItem) => (
                    <CardContent key={receiptItem.item_id}>
                        <Typography>
                            {receiptItem.name}: ${receiptItem.amount}
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

    return (
        <>
            {technicians.length > 0 && (
                <Grid container spacing={2}>
                    {technicians.map((technician) => (
                        <Grid item key={technician.id}>
                            {technician.receipt_items ? (
                                <EditReceiptCard technician={technician} />
                            ) : (
                                <AddReceiptCard technician={technician} />
                            )}
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default TechnicianReceipt;
