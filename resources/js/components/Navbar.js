import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";
const useNavbarStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));
const Navbar = () => {
    const classes = useNavbarStyles();

    let history = useHistory();

    const logout = async () => {
        try {
            const result = await authClient.post("/logout");
            localStorage.clear();
            history.push("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Payroll
                </Typography>
                <Button color="inherit" href="/technicians">
                    Technicians
                </Button>
                <Button color="inherit" href="/register">
                    Register
                </Button>
                <Button color="inherit" onClick={logout}>
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
