import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TechnicianDashboard from "./views/TechnicianDashboard";

const AppRouter = () => (
    <div className="app-router">
        <Router>
            <Switch>
                <Route path="/technicians" component={TechnicianDashboard}/>
            </Switch>
        </Router>
    </div>
)

export default AppRouter;