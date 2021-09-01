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
import TechnicianReceipt from "../components/TechnicianReceipt";

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

    const [date, setDate] = useState(null);

    const [allReceipts, setAllReceipts] = useState({
        date: new Date(),
        data: [],
    });

    const [technicians, setTechnicians] = useState([]);

    const [technician, setTechnician] = useState(null);

    const [addReceiptDialog, setAddReceiptDialog] = useState(false);

    const [editReceiptDialog, setEditReceiptDialog] = useState(false);

    const [receiptItems, setReceiptItems] = useState([]);

    useEffect(() => {
        const getTechnicians = async () => {
            const technicians = await authClient.get("technicians");
            setTechnicians(technicians.data.data);
        };

        getTechnicians();
    }, []);

    useEffect(() => {
        const getReceiptItems = async () => {
            const receiptItems = await authClient.get(
                "items/?name=sale_receipt,tip_receipt"
            );
            setReceiptItems(receiptItems.data.data);
        };

        getReceiptItems();
    }, []);

    useEffect(() => {
        setAllReceipts({ ...allReceipts, date });
    }, [date]);

    const handleAddReceipt = (newReceipt) => {
        const technician = technicians.find(
            (technician) => technician.id === newReceipt.technician_id
        );
        technician.receipts = newReceipt.receipts;

        const newReceipts = {
            ...allReceipts,
            data: [...allReceipts.data, newReceipt],
        };
        setAllReceipts(newReceipts);
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

    const handleReceiptSubmit = async () => {
        const postReceipts = await authClient.post("all-receipts", allReceipts);
        console.log("response ", postReceipts.data.data);
    };

    const handleDate = (receiptDate) => {
        setDate(receiptDate);
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
                                <TechnicianReceipt date={date} />
                                {/* <Grid item xs={12}>
                                    {technicians.length > 0 && (
                                        <Grid container spacing=4{2}>
                                            {technicians.map((technician) => (
                                                <Grid
                                                    item
                                                    xs={2}
                                                    sm={3}
                                                    key={technician.id}
                                                >
                                                    {technician.hasOwnProperty(
                                                        "receipts"
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
                                </Grid> */}
                                <Grid item xs={12}>
                                    {allReceipts.data.length > 0 && (
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
                    receiptItems={receiptItems}
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
                    receiptItems={receiptItems}
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
