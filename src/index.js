import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import FormGenerator from './containers';
import RenderedForm from './renderedForm';

import './styles/root.scss';

const root = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={FormGenerator} />
        <Route path="/form" component={RenderedForm} />
    </BrowserRouter>,
    root
);
