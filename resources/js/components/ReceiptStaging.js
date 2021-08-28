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
                                technician.hasOwnProperty("receipts")
                            )
                            .map((technician) => (
                                <div key={technician.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={technician.first_name}
                                        />
                                    </ListItem>

                                    {technician.receipts.map((receipt) => (
                                        <Typography key={receipt.item_id}>
                                            {`${receipt.name
                                                .split("_")
                                                .join(" ")}: $${
                                                receipt.amount
                                            }`}
                                        </Typography>
                                    ))}
                                </div>
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
