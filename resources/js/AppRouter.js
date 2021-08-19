import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import TechnicianDashboard from "./views/TechnicianDashboard";

const AppRouter = () => (
    <div className="app-router">
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/technicians" component={TechnicianDashboard}/>
            </Switch>
        </Router>
    </div>
)

export default AppRouter;