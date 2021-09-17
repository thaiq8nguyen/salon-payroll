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
const ReceiptStaging = ({ receipts, technicians, handleSubmit }) => {
    const classes = useSaleStagingStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Typography>Receipts</Typography>
                </CardContent>
                <CardContent>
                    <List>
                        {receipts.map((receipt) => (
                            <div key={receipt.technician_id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            technicians.find(
                                                (technician) =>
                                                    technician.id ===
                                                    receipt.technician_id
                                            ).first_name
                                        }
                                    />
                                </ListItem>

                                {receipt.items.map((item) => (
                                    <Typography key={item.item_id}>
                                        {`${item.name.split("_").join(" ")}: $${
                                            item.amount
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
