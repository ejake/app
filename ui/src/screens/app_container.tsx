import React from "react";

import {Route, Switch, Redirect} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";

import LoginView from "../screens/login_view";
import RunView from "./run_view";
import PageNotFound from "./page_not_found_view";
import RunsListView from "./runs_list_view";
import ReactGA from 'react-ga';
import ConfigsCard from "../cards/configs/card"
import MetricsCard from "../cards/metrics/card"


import NETWORK from '../network'

/* TODO: Get this from configs */
ReactGA.initialize('UA-164228270-01');

function AppContainer() {
    ReactGA.pageview(window.location.pathname + window.location.search)

    const history = useHistory()
    const location = useLocation();

    NETWORK.axiosInstance.interceptors.response.use(function (response: any) {
        return response
    }, function (error: any) {
        if (error.response.status === 403) {
            history.push(`/login/?redirect=${location.pathname + location.search}`)
        }

        return Promise.reject(error)
    })

    return (
        <main>
            <Switch>
                <Route path="/404" component={PageNotFound}/>
                <Route path="/run" component={RunView}/>
                <Route path="/configs" component={ConfigsCard.View}/>
                <Route path="/metrics" component={MetricsCard.View}/>
                <Route path="/runs" component={RunsListView}/>
                <Route path="/login" component={LoginView}/>
                <Route path="/"><Redirect to="/runs"/></Route>
            </Switch>
        </main>
    );
}

export default AppContainer;
