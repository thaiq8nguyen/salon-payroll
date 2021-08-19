import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";

const useTechniciansStyles = makeStyles((theme) => {});
const Technicians = ({ history }) => {
    const classes = useTechniciansStyles();

    return (
        <>
            <Grid container></Grid>
        </>
    );
};

export default Technicians;
