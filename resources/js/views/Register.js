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
import AddSale from "../components/AddSale";
import EditSaleDialog from "../components/EditSaleDialog";
import SaleStaging from "../components/SaleStaging";
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

    const [sales, setSales] = useState([]);

    const [technicians, setTechnicians] = useState([]);

    const [technician, setTechnician] = useState(null);

    const [addSaleDialog, setAddSaleDialog] = useState(false);

    const [editSaleDialog, setEditSaleDialog] = useState(false);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getTechnicians = async () => {
            const technicians = await authClient.get("technicians");
            setTechnicians(technicians.data);
        };

        getTechnicians();
    }, []);

    const handleAddSale = (sale) => {
        const technician = technicians.find(
            (technician) => technician.id === sale.technician_id
        );
        technician.sale_amount = sale.sale_amount;
        if (sale.tip_amount) {
            technician.tip_amount = sale.tip_amount;
        }
        const newSales = [...sales, sale];
        setSales(newSales);
        setTechnician(null);
        setAddSaleDialog(false);
    };

    const handleEditSale = (editedSale) => {
        const technician = technicians.find(
            (technician) => technician.id === editedSale.technician_id
        );
        technician.sale_amount = editedSale.sale_amount;
        if (editedSale.tip_amount) {
            technician.tip_amount = editedSale.tip_amount;
        }

        const editedSales = sales.map((sale) =>
            sale.technician_id === editedSale.technician_id ? editedSale : sale
        );
        setSales(editedSales);
        setTechnician(null);
        setEditSaleDialog(false);
    };

    const handleDeleteSale = (technicianId) => {
        const technician = technicians.find(
            (technician) => technician.id === technicianId
        );

        delete technician.sale_amount;
        if (technician.hasOwnProperty("tip_amount")) {
            delete technician.tip_amount;
        }

        const deletedSales = sales.filter(
            (sale) => sale.technician_id !== technicianId
        );
        setSales(deletedSales);
        setTechnician(null);
        setEditSaleDialog(false);
    };

    const handleSaleSubmit = () => {
        const data = { date, sales };
        console.log(data);
    };

    const handleDate = (date) => {
        setDate(date);
    };

    const AddSaleCard = ({ technician }) => {
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
                                setAddSaleDialog(true);
                            }}
                        >
                            Add Sale
                        </Button>
                    </CardActions>
                </Card>
            </>
        );
    };

    const EditSaleCard = ({ technician }) => {
        return (
            <Card>
                <CardContent>
                    <Typography>{technician.first_name}</Typography>
                </CardContent>

                <CardContent>
                    <Typography>Sale: ${technician.sale_amount}</Typography>
                </CardContent>

                {technician.tip_amount && (
                    <CardContent>
                        <Typography>Tip: ${technician.tip_amount}</Typography>
                    </CardContent>
                )}

                <CardActions>
                    <Button
                        color="primary"
                        onClick={() => {
                            setTechnician(technician);
                            setEditSaleDialog(true);
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
                                                        "sale_amount"
                                                    ) ? (
                                                        <EditSaleCard
                                                            technician={
                                                                technician
                                                            }
                                                        />
                                                    ) : (
                                                        <AddSaleCard
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
                                    {sales.length > 0 && (
                                        <SaleStaging
                                            technicians={technicians}
                                            handleSubmit={handleSaleSubmit}
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
                    open={addSaleDialog}
                    technician={technician}
                    handleClose={() => {
                        setAddSaleDialog(false), setTechnician(null);
                    }}
                    handleSubmit={handleAddSale}
                />
            )}
            {technician && (
                <EditSaleDialog
                    open={editSaleDialog}
                    technician={technician}
                    handleClose={() => {
                        setEditSaleDialog(false), setTechnician(null);
                    }}
                    handleSubmit={handleEditSale}
                    handleDelete={handleDeleteSale}
                />
            )}
        </>
    );
};

export default Register;
