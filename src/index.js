import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import MainLayout from './layout/main';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Router>
        <Switch>
            <Route path='/main' component={MainLayout} />
            <Redirect from='/' to='/main/dashboard' />
        </Switch>
    </Router>,
    document.getElementById('root')
)
serviceWorker.unregister();
