import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Technicians from "./views/Technicians";
import Register from "./views/Register";
import NewReceipt from "./views/NewReceipt";
import ExistingReceipt from "./views/ExistingReceipt";
import Payday from "./views/Payday";

const AppRouter = () => (
    <div className="app-router">
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/technicians" component={Technicians} />
                <Route exact path="/register" component={Register} />
                <Route path="/register/new-receipts" component={NewReceipt} />
                <Route path="/register/existing-receipts" component={ExistingReceipt} />
                <Route path="/payday" component={Payday} />
            </Switch>
        </Router>
    </div>
);

export default AppRouter;
