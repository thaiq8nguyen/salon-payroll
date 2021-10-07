import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CssBaseline,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";
import { authClient } from "../http";

const usePaydayStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    navBarSpacer: theme.mixins.toolbar
}));
const Payday = () => {
    const classes = usePaydayStyles();

    const [periods, setPeriods] = useState([]);
    const [selectPeriod, setSelectPeriod] = useState("");
    const handleChange = (event) => {
        setSelectPeriod(event.target.value);
    };

    useEffect(() => {
        const getPeriods = async () => {
            const response = await authClient.get("/periods");
            setPeriods(response.data.periods);
        };

        getPeriods();
    }, []);
    return (
        <div>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.navBarSpacer} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {periods.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel id="period-label">Periods</InputLabel>
                                <Select
                                    labelId="period-label"
                                    id="period-select"
                                    value={selectPeriod}
                                    label="Periods"
                                    onChange={handleChange}
                                >
                                    {periods.map((period) => (
                                        <MenuItem key={period.id} value={period.id}>
                                            {`${period.start} to ${period.end}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        Technicians
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default Payday;
