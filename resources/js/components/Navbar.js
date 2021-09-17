import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { authClient } from "../http";

const useNavbarStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        flexGrow: 1
    },
    offset: theme.mixins.toolbar
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
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Payroll X
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
        </div>
    );
};

export default Navbar;
