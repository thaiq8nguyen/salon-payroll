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
const ReceiptStaging = ({ technicians, handleSubmit }) => {
    const classes = useSaleStagingStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Receipts</Typography>
                </CardContent>
                <CardContent>
                    <List>
                        {technicians
                            .filter((technician) =>
                                technician.hasOwnProperty("receipt_sale_amount")
                            )
                            .map((technician) => (
                                <ListItem key={technician.id}>
                                    <ListItemText
                                        primary={technician.first_name}
                                        secondary={
                                            <>
                                                <Typography component="span">
                                                    Sale Receipt: $
                                                    {
                                                        technician.receipt_sale_amount
                                                    }
                                                </Typography>
                                                &nbsp;
                                                {technician.receipt_tip_amount && (
                                                    <Typography
                                                        component="span"
                                                        style={{
                                                            marginLeft: 20,
                                                        }}
                                                    >
                                                        Tip Receipt: $
                                                        {
                                                            technician.receipt_tip_amount
                                                        }
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

export default ReceiptStaging;
