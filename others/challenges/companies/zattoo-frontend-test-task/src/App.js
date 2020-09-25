import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Routes from './routes';
import Container from './components/Container';


const loggerMiddleware = createLogger();

import ContainerReducer
    from './components/Container/Container.reducer';
import ChannelsTableReducer
    from './components/ChannelsTable/ChannelsTable.reducer';


const store = createStore(
    combineReducers({
        ContainerReducer,
        ChannelsTableReducer
    }),
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

function App() {
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Container>
                        <Routes />
                    </Container>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
