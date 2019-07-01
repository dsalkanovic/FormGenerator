import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FormGenerator from './containers';
import RenderedForm from './renderedForm';

import './styles/root.scss';

const root = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={FormGenerator} />
            <Route path={`${process.env.PUBLIC_URL}/form`} component={RenderedForm} />
        </Switch>
    </BrowserRouter>,
    root
);
