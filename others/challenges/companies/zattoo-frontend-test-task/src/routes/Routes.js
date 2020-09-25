import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ChannelsTable from '../components/ChannelsTable';

function Routes() {
    return (
        <Switch>
            <Route
                exact
                path="/channels"
                component={ChannelsTable} />
            <Redirect from="/" exact to="/channels" />
        </Switch>
    );
}

export default Routes;
