import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CssBaseline,
    Grid,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";

import Navbar from "../components/Navbar";
import AddSale from "../components/AddReceipt";
import EditReceiptDialog from "../components/EditReceiptDialog";
import ReceiptStaging from "../components/ReceiptStaging";
import SalonCalendar from "../components/SalonCalendar";

const useRegisterStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 2),
    },
    offset: theme.mixins.toolbar,
    textField: {
        width: "15ch",
    },
    verticalContainer: {
        padding: theme.spacing(2),
    },
    tableContainer: {
        marginBottom: theme.spacing(3),
    },
    buttonContainer: {
        justifyContent: "flex-end",
    },
}));
const Register = ({ history }) => {
    const classes = useRegisterStyles();

    const [receipts, setReceipts] = useState([]);

    const [technicians, setTechnicians] = useState([]);

    const [technician, setTechnician] = useState(null);

    const [addReceiptDialog, setAddReceiptDialog] = useState(false);

    const [editReceiptDialog, setEditReceiptDialog] = useState(false);

    const [date, setDate] = useState(new Date());

    const [receiptItems, setReceiptItems] = useState([]);

    useEffect(() => {
        const getTechnicians = async () => {
            const technicians = await authClient.get("technicians");
            setTechnicians(technicians.data);
        };

        getTechnicians();
    }, []);

    useEffect(() => {
        const getReceiptItems = async () => {
            const receiptItems = await authClient.get(
                "items/?name=technician_sale,technician_tip"
            );
            setReceiptItems(receiptItems.data.data);
        };

        getReceiptItems();
    }, []);

    const handleAddReceipt = (receipt) => {
        const technician = technicians.find(
            (technician) => technician.id === receipt.technician_id
        );
        technician.receipt_sale_amount = receipt.receipt_sale_amount;
        if (receipt.receipt_tip_amount) {
            technician.receipt_tip_amount = receipt.receipt_tip_amount;
        }
        const newReceipts = [...receipts, receipt];
        setReceipts(newReceipts);
        setTechnician(null);
        setAddReceiptDialog(false);
    };

    const handleEditReceipt = (editedReceipt) => {
        const technician = technicians.find(
            (technician) => technician.id === editedReceipt.technician_id
        );
        technician.receipt_sale_amount = editedReceipt.receipt_sale_amount;
        if (editedReceipt.receipt_tip_amount) {
            technician.receipt_tip_amount = editedSale.receipt_tip_amount;
        }

        const editedReceipts = receipts.map((receipt) =>
            receipt.technician_id === editedReceipt.technician_id
                ? editedReceipt
                : sale
        );
        setReceipt(editedReceipts);
        setTechnician(null);
        setEditReceiptDialog(false);
    };

    const handleDeleteReceipt = (technicianId) => {
        const technician = technicians.find(
            (technician) => technician.id === technicianId
        );

        delete technician.receipt_sale_amount;
        if (technician.hasOwnProperty("receipt_tip_amount")) {
            delete technician.receipt_tip_amount;
        }

        const deletedReceipts = sales.filter(
            (receipt) => receipt.technician_id !== technicianId
        );
        setReceipts(deletedReceipts);
        setTechnician(null);
        setEditReceiptDialog(false);
    };

    const handleReceiptSubmit = () => {
        const data = { date, receipts };
        console.log(data);
    };

    const handleDate = (date) => {
        setDate(date);
    };

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

                <CardContent>
                    <Typography>
                        Sale: ${technician.receipt_sale_amount}
                    </Typography>
                </CardContent>

                {technician.receipt_tip_amount && (
                    <CardContent>
                        <Typography>
                            Tip: ${technician.receipt_tip_amount}
                        </Typography>
                    </CardContent>
                )}

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
            <CssBaseline />
            <Grid container>
                <Navbar />

                <Grid item xs={12} className={classes.content}>
                    <div className={classes.offset} />
                    <Grid container className={classes.dataCardContainer}>
                        <Grid item xs={6} className={classes.verticalContainer}>
                            <SalonCalendar handleSelectDate={handleDate} />
                        </Grid>
                        <Grid item xs={6} className={classes.verticalContainer}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {technicians.length > 0 && (
                                        <Grid container spacing={2}>
                                            {technicians.map((technician) => (
                                                <Grid
                                                    item
                                                    xs={2}
                                                    sm={3}
                                                    key={technician.id}
                                                >
                                                    {technician.hasOwnProperty(
                                                        "receipt_sale_amount"
                                                    ) ? (
                                                        <EditReceiptCard
                                                            technician={
                                                                technician
                                                            }
                                                        />
                                                    ) : (
                                                        <AddReceiptCard
                                                            technician={
                                                                technician
                                                            }
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
                                            technicians={technicians}
                                            handleSubmit={handleReceiptSubmit}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {technician && (
                <AddSale
                    open={addReceiptDialog}
                    technician={technician}
                    receiptItem={receiptItems}
                    handleClose={() => {
                        setAddReceiptDialog(false), setTechnician(null);
                    }}
                    handleSubmit={handleAddReceipt}
                />
            )}
            {technician && (
                <EditReceiptDialog
                    open={editReceiptDialog}
                    technician={technician}
                    handleClose={() => {
                        setEditReceiptDialog(false), setTechnician(null);
                    }}
                    handleSubmit={handleEditReceipt}
                    handleDelete={handleDeleteReceipt}
                />
            )}
        </>
    );
};

export default Register;
