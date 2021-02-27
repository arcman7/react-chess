import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav } from './Nav';
import { PrivateRoute } from './PrivateRoute'
import { Home } from './Home';
import { EditAccount } from './EditAccount';
import { Login } from './Login';

function Facebook() {
    const pathname = useLocation().pathname || '';

    return (
        <div>
            <Nav />
            <div className="container pt-4">
                {/* <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/edit/:id" component={EditAccount} />
                    <Route path="/login" component={Login} />
                    <Redirect from="*" to="/" />
                </Switch> */}
                <Home>
                </Home>
                {/* <EditAccount></EditAccount> */}
                <Switch>
                    <Route path="/test" component={Login} />
                </Switch>
            </div>
        </div>
    );
}

export { Facebook }; 