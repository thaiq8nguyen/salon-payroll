import React, { useEffect } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Formik, Field } from "formik";
import { client } from "../http";
const useStyles = makeStyles((theme) => ({
    container: {},
    paper: {},
}));
const Login = ({ history }) => {
    const classes = useStyles();

    const token = localStorage.getItem("token") || null;

    useEffect(() => {
        if (token) {
            history.push("/technicians");
        }
    }, [token]);

    const login = async (credential) => {
        const response = await client.post("/login", credential);

        localStorage.setItem("token", response.data.token);

        history.push("/technicians");
    };

    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography>Payroll</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(credential) => {
                                    //performs login

                                    login(credential);
                                }}
                                children={(props) => <LoginForm {...props} />}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

const formStyles = makeStyles((theme) => ({
    loginButton: {
        marginTop: theme.spacing(2),
    },
}));
const LoginForm = ({ values, handleChange, handleSubmit }) => {
    const classes = formStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    id="email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    required
                    id="password"
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} className={classes.loginButton}>
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;
