import React, { useEffect, useState } from "react";
import {
    Button,
    CssBaseline,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { authClient } from "../http";

import Navbar from "../components/Navbar";

import SalonCalendar from "../components/SalonCalendar";
import Receipt from "../components/Receipt";

const useRegisterStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 2)
    },
    offset: theme.mixins.toolbar,
    textField: {
        width: "15ch"
    },
    verticalContainer: {
        padding: theme.spacing(2)
    },
    tableContainer: {
        marginBottom: theme.spacing(3)
    },
    buttonContainer: {
        justifyContent: "flex-end"
    },
    navBarSpacer: theme.mixins.toolbar
}));
const Register = ({ history }) => {
    const classes = useRegisterStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.navBarSpacer} />
                <Grid container>
                    <List>
                        <ListItem button component={Link} to="/register/new-receipts">
                            <ListItemText primary="New Receipts" />
                        </ListItem>
                        <ListItem button component={Link} to="/register/existing-receipts">
                            <ListItemText primary="Existing Receipts" />
                        </ListItem>
                    </List>
                </Grid>
            </main>
        </div>
    );
};

export default Register;
