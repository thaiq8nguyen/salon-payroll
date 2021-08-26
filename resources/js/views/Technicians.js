import React, { useEffect, useState } from "react";
import {
    Button,
    CssBaseline,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";

// Components
import AddTechnician from "../components/AddTechnician";
import EditTechnician from "../components/EditTechnician";
import Navbar from "../components/Navbar";

const useTechniciansStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 2),
    },
    offset: theme.mixins.toolbar,
}));
const Technicians = ({ history }) => {
    const classes = useTechniciansStyles();

    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const getTechnicians = async () => {
            const technicians = await authClient.get("technicians");
            setTechnicians(technicians.data);
        };

        getTechnicians();
    }, []);
    const [newDialog, setNewDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editTechnician, setEditTechnician] = useState();

    const onAddCompleted = (newTechnician) => {
        const newTechnicians = [...technicians, newTechnician];
        setTechnicians(newTechnicians);
        setNewDialog(false);
    };

    // update technicians array to include the edited technician
    const onEditCompleted = (editedTechnician) => {
        const newTechnicians = technicians.map((technician) =>
            technician.id === editedTechnician.id
                ? editedTechnician
                : technician
        );

        setTechnicians(newTechnicians);
        setEditDialog(false);
    };

    const onDeleteCompleted = (deletedTechnician) => {
        const newTechnicians = technicians.filter(
            (technician) => technician.id !== deletedTechnician.id
        );

        setTechnicians(newTechnicians);
        setEditDialog(false);
    };

    return (
        <>
            <CssBaseline />
            <Grid container>
                <Navbar />
                <Grid item xs={12} className={classes.content}>
                    <div className={classes.offset} />
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                size="medium"
                                variant="contained"
                                onClick={() => setNewDialog(true)}
                            >
                                Add Technician
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {technicians.length > 0 && (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    First name
                                                </TableCell>
                                                <TableCell>Last name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>
                                                    Phone number
                                                </TableCell>
                                                <TableCell>Active</TableCell>
                                                <TableCell>
                                                    Contractor
                                                </TableCell>
                                                <TableCell>Admin</TableCell>
                                                <TableCell>Edit</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {technicians.map((technician) => (
                                                <TableRow key={technician.id}>
                                                    <TableCell>
                                                        {technician.first_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.last_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.email ||
                                                            "None"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.phone_number ||
                                                            "None"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.is_active
                                                            ? "Yes"
                                                            : "No"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.is_contractor
                                                            ? "Yes"
                                                            : "No"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {technician.is_admin
                                                            ? "Yes"
                                                            : "No"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            color="primary"
                                                            onClick={() => {
                                                                setEditTechnician(
                                                                    technician
                                                                );
                                                                setEditDialog(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {editTechnician && (
                <EditTechnician
                    technician={editTechnician}
                    open={editDialog}
                    handleClose={() => setEditDialog(false)}
                    handleEditCompleted={onEditCompleted}
                    handleDeleteCompleted={onDeleteCompleted}
                />
            )}

            <AddTechnician
                open={newDialog}
                handleClose={() => setNewDialog(false)}
                handleAddCompleted={onAddCompleted}
            />
        </>
    );
};

export default Technicians;
