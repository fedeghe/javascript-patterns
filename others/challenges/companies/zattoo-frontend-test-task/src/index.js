import { AppContainer } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import configProvider from './providers/configProvider';

import styles from '../styles.css';
import App from './App';
import config from './../config.json';


function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    );
}

configProvider.set(config);

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}