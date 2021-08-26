import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useSaleStagingStyles = makeStyles((theme) => ({
    cardActions: {
        justifyContent: "flex-end",
    },
}));
const SaleStaging = ({ technicians, handleSubmit }) => {
    const classes = useSaleStagingStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Sales</Typography>
                </CardContent>
                <CardContent>
                    <List>
                        {technicians
                            .filter((technician) =>
                                technician.hasOwnProperty("sale_amount")
                            )
                            .map((technician) => (
                                <ListItem key={technician.id}>
                                    <ListItemText
                                        primary={technician.first_name}
                                        secondary={
                                            <>
                                                <Typography component="span">
                                                    Sale: $
                                                    {technician.sale_amount}
                                                </Typography>
                                                &nbsp;
                                                {technician.tip_amount && (
                                                    <Typography
                                                        component="span"
                                                        style={{
                                                            marginLeft: 20,
                                                        }}
                                                    >
                                                        Tip: $
                                                        {technician.tip_amount}
                                                    </Typography>
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                    </List>
                </CardContent>
                <CardActions
                    className={classes.cardActions}
                    onClick={handleSubmit}
                >
                    <Button color="primary">Submit</Button>
                </CardActions>
            </Card>
        </>
    );
};

export default SaleStaging;
