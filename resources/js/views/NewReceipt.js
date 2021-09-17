import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardActions,
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import SalonCalendar from "../components/SalonCalendar";
import AddReceiptDialog from "../components/AddReceiptDialog";

const drawerWidth = 300;
const useNewReceiptStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    },
    navBarSpacer: theme.mixins.toolbar,
    /**Drawer Styles **/
    drawer: {
        width: drawerWidth,
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto"
    },

    title: {
        flexGrow: 1
    },
    submitButtonContainer: {
        padding: theme.spacing(2, 0),
        marginTop: "auto",
        justifyContent: "center"
    },
    breadcrumbsContainer: {
        padding: theme.spacing(0, 0, 2, 0)
    }
}));
const NewReceipt = () => {
    const classes = useNewReceiptStyles();
    const [date, setDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
    const [referenceTechnicians, setReferenceTechnicians] = useState([]);
    //const [technicians, setTechnicians] = useState([]);
    //const [existingReceipts, setExistingReceipts] = useState([]);
    const [techniciansWithoutReceipt, setTechniciansWithoutReceipt] = useState([]);
    const [newReceipts, setNewReceipts] = useState([]);
    const [drawer, openDrawer] = useState(false);

    /** Getting all the technicians in the salon */
    useEffect(() => {
        const getTechnicians = async () => {
            const result = await authClient.get("technicians?details=false");
            //setTechnicians(result.data.technicians);
            setReferenceTechnicians(result.data.technicians);
        };

        getTechnicians();
    }, []);

    /**Getting technician receipts, if any based on a date */
    useEffect(() => {
        const getTechniciansWithoutReceipt = async () => {
            const response = await authClient.get(
                `/technicians/receipts?date=${date}&with-receipts=true`
            );

            setTechniciansWithoutReceipt(response.data.technicians);
        };

        getTechniciansWithoutReceipt();
    }, [date]);

    /**Open right hand drawer if there are items in newReceipts */
    useEffect(() => {
        if (newReceipts.length) {
            openDrawer(true);
        } else {
            openDrawer(false);
        }
    }, [newReceipts]);

    const handleSelectDate = (selectedDate) => {
        setDate(selectedDate);
    };

    const handleAddReceipt = (receipt) => {
        const pendingWithoutReceipts = techniciansWithoutReceipt.filter(
            (technician) => technician.technician_id !== receipt.technician_id
        );

        setTechniciansWithoutReceipt(pendingWithoutReceipts);
        setNewReceipts([...newReceipts, { ...receipt, date }]);
    };

    const handleDeleteReceipt = (technicianId) => {
        const newReceiptsMinusOne = newReceipts.filter(
            (receipt) => receipt.technician_id !== technicianId
        );
        setNewReceipts(newReceiptsMinusOne);

        const index = referenceTechnicians.findIndex(
            (technician) => technician.id === technicianId
        );

        /**Add the technician at its original index  */
        const tempTechnicians = [...techniciansWithoutReceipt];
        tempTechnicians.splice(index, 0, referenceTechnicians[index]);
        setTechniciansWithoutReceipt(tempTechnicians);
    };

    const handleSubmit = async () => {
        const response = await authClient.post("receipts/bulk", { receipts: newReceipts });
        const techniciansWithReceipt = response.data.data;
        const noReceipts = techniciansWithoutReceipt.filter(
            (technician) =>
                !techniciansWithReceipt.some((receipt) => technician.id === receipt.technician_id)
        );

        setTechniciansWithoutReceipt(noReceipts);
        openDrawer(false);
        setNewReceipts([]);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={clsx(classes.content, { [classes.contentShift]: drawer })}>
                <div className={classes.navBarSpacer} />
                <Grid container>
                    <Grid item xs={12} className={classes.breadcrumbsContainer}>
                        <Breadcrumbs>
                            <Link component={RouterLink} to="/register">
                                Register
                            </Link>
                            <Link component={RouterLink} to="/new-receipts" color="textPrimary">
                                New Receipts
                            </Link>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <SalonCalendar handleSelectDate={handleSelectDate} />
                            </Grid>
                            {techniciansWithoutReceipt.length ? (
                                <Grid item xs={8}>
                                    <ReceiptCardContainer
                                        date={date}
                                        techniciansWithoutReceipt={techniciansWithoutReceipt}
                                        handleAddReceipt={handleAddReceipt}
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={8}>
                                    {newReceipts.length > 0 ? (
                                        <Typography>
                                            Click "Submit" to enter the receipts into the system
                                        </Typography>
                                    ) : (
                                        <Typography>
                                            All receipts have been entered into the system
                                        </Typography>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </main>
            <Drawer
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
                variant="persistent"
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.navBarSpacer} />
                <List>
                    {newReceipts.map((receipt) => (
                        <ListItem key={receipt.technician_id}>
                            <ListItemText>
                                <Typography>
                                    {
                                        referenceTechnicians.find(
                                            (technician) => technician.id === receipt.technician_id
                                        ).first_name
                                    }
                                </Typography>
                            </ListItemText>

                            {receipt.items.map((item, index) => (
                                <ListItemText key={index}>
                                    <Typography component="span" color="textSecondary">
                                        {item.name.split("_")[0]}:&nbsp;
                                    </Typography>
                                    <Typography component="span">${item.amount}</Typography>
                                </ListItemText>
                            ))}
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => handleDeleteReceipt(receipt.technician_id)}
                                >
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                <Grid container className={classes.submitButtonContainer}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Drawer>
            e
        </div>
    );
};

const ReceiptCard = ({ technician, receiptItems, handleAddReceipt }) => {
    const [addReceiptDialog, setAddReceiptDialog] = useState(false);

    const openAddReceiptDialog = () => {
        setAddReceiptDialog(true);
    };

    const handleAddItems = (items) => {
        setAddReceiptDialog(false);
        handleAddReceipt(items);
    };

    return (
        <>
            <Card>
                <CardContent>{technician.first_name}</CardContent>
                <CardActions>
                    <Button onClick={openAddReceiptDialog}>Add Receipts</Button>
                </CardActions>
            </Card>

            {addReceiptDialog ? (
                <AddReceiptDialog
                    open={addReceiptDialog}
                    technician={technician}
                    receiptItems={receiptItems}
                    handleClose={() => setAddReceiptDialog(false)}
                    handleSubmit={handleAddItems}
                />
            ) : null}
        </>
    );
};

const ReceiptCardContainer = ({ date, techniciansWithoutReceipt, handleAddReceipt }) => {
    const [receiptItems, setReceiptItems] = useState([]);

    useEffect(() => {
        const getReceiptItems = async () => {
            const response = await authClient.get("items?name=sale_receipt,tip_receipt");
            setReceiptItems(response.data.data);
        };

        getReceiptItems();
    }, []);

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography gutterBottom color="textSecondary" variant="h4">
                        {dayjs(date).format("dddd, MM/DD/YYYY")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {techniciansWithoutReceipt.map((technician) => (
                            <Grid item xs={3} key={technician.technician_id}>
                                <ReceiptCard
                                    technician={technician}
                                    receiptItems={receiptItems}
                                    handleAddReceipt={handleAddReceipt}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default NewReceipt;
