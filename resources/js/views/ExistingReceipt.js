import React, { useEffect, useState } from "react";
import {
    Breadcrumbs,
    Button,
    CssBaseline,
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import SalonCalendar from "../components/SalonCalendar";
import EditReceiptDialog from "../components/EditReceiptDialog";

const useExistingReceiptStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 2)
    },
    offset: theme.mixins.toolbar,
    paper: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(3)
    },
    breadcrumbsContainer: {
        padding: theme.spacing(0, 0, 2, 0)
    }
}));
const ExistingReceipt = () => {
    const classes = useExistingReceiptStyles();
    const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [technicians, setTechnicians] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [technician, setTechnician] = useState(null);
    const [receiptItems, setReceiptItems] = useState([]);
    const [editReceiptDialog, setEditReceiptDialog] = useState(false);

    useEffect(() => {
        const getTechnicians = async () => {
            const result = await authClient.get("technicians");
            setTechnicians(result.data.data);
        };

        getTechnicians();
    }, []);
    useEffect(() => {
        const getExistingReceipts = async () => {
            const response = await authClient.get(`receipts?date=${date}`);

            setReceipts(response.data.data);
        };

        getExistingReceipts();
    }, [date]);

    useEffect(() => {
        const getReceiptItems = async () => {
            const receiptItems = await authClient.get("items?name=sale_receipt,tip_receipt");
            setReceiptItems(receiptItems.data.data);
        };

        getReceiptItems();
    }, []);

    const handleEditReceiptDialogOpen = (receipt) => {
        const selectedTechnician = technicians.find(
            (technician) => technician.id === receipt.technician_id
        );

        selectedTechnician.items = receipt.items;
        selectedTechnician.receipt_id = receipt.receipt_id;

        setTechnician(selectedTechnician);
        setEditReceiptDialog(true);
    };

    const handleEdit = (editedReceipt) => {
        const editedReceipts = receipts.map((receipt) =>
            receipt.receipt_id === editedReceipt.receipt_id
                ? { ...receipt, items: editedReceipt.items }
                : receipt
        );

        setReceipts(editedReceipts);
        setEditReceiptDialog(false);
    };

    const handleDelete = (deletedReceipt) => {
        const deletedReceipts = receipts.filter(
            (receipt) => receipt.receipt_id !== deletedReceipt.receipt_id
        );
        setReceipts(deletedReceipts);
        setEditReceiptDialog(false);
    };

    const handleSelectDate = (selectedDate) => {
        setDate(selectedDate);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />

            <Navbar />
            <main className={classes.content}>
                <div className={classes.offset} />
                <Grid container>
                    <Grid item xs={12} className={classes.breadcrumbsContainer}>
                        <Breadcrumbs>
                            <Link component={RouterLink} to="/register">
                                Register
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/existing-receipts"
                                color="textPrimary"
                            >
                                New Receipts
                            </Link>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={4}>
                            <SalonCalendar handleSelectDate={handleSelectDate} />
                        </Grid>
                        <Grid item xs={8}>
                            {receipts.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Technician</TableCell>
                                                <TableCell>Sale Receipt</TableCell>
                                                <TableCell>Tip Receipt</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {receipts.map((receipt) => (
                                                <TableRow key={receipt.receipt_id}>
                                                    <TableCell>
                                                        {
                                                            technicians.find(
                                                                (technician) =>
                                                                    technician.id ===
                                                                    receipt.technician_id
                                                            ).first_name
                                                        }
                                                    </TableCell>
                                                    {receipt.items.map((item) => (
                                                        <TableCell key={item.item_id}>
                                                            ${item.amount}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell>
                                                        <Button
                                                            onClick={() =>
                                                                handleEditReceiptDialogOpen(receipt)
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Paper className={classes.paper}>
                                    <Typography>No receipts has been found</Typography>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </main>

            {technician && (
                <EditReceiptDialog
                    open={editReceiptDialog}
                    technician={technician}
                    receiptItems={receiptItems}
                    handleClose={() => {
                        setEditReceiptDialog(false), setTechnician(null);
                    }}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            )}
        </div>
    );
};

export default ExistingReceipt;
