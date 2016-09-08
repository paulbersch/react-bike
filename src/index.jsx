import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, dispatch, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { GeocodeSaga } from './sagas/GeocodeSaga';
import { StationsSaga } from './sagas/StationsSaga';
import { Provider, connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { Panel } from './components/Panel';
import createLogger from 'redux-logger';

const gMapReducer = (state = {}, action) => {
    "use strict";

    switch (action.type) {
        case 'GOOGLE_MAPS_LOADED':
            return Object.assign({}, state, {
                googleMapsAPILoaded: true
            });
        case 'UPDATE_CENTER':
            return Object.assign({}, state, {
                latLng: action.payload.latLng
            });
        case 'UPDATE_SEARCH_BOUNDS':
            return Object.assign({}, state, {
                bounds: action.payload.bounds
            });
        case 'UPDATE_STATIONS':
            return Object.assign({}, state, {
                stations: action.payload.stations
            });
        case 'UPDATE_ZOOM':
            return state;
        case 'CLEAR_MARKERS':
            return state;
        case 'CREATE_MARKER':
            return state;
        default:
            return state;
    }
};

const panelReducer = (state = {}, action) => {
    "use strict";

    switch (action.type) {
        case 'UPDATE_SEARCH':
            console.log(state, action);
            return Object.assign({}, state, {
                searchTerm: action.payload.searchTerm,
                distance: action.payload.distance
            });
        case 'CREATE_SEARCH_RESULT':
            return state;
        default:
            return state;
    }
}
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const store = createStore(
    combineReducers({ panel: panelReducer, map: gMapReducer}),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(GeocodeSaga);
sagaMiddleware.run(StationsSaga);

class PanelWithDefaultSearch extends React.Component {
    render() {
        return (
            <Panel searchTerm="Florida" distance={2} />
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/search/:searchTerm/:distance/" component={ Panel }/>
            <Route path="/search/" component={ PanelWithDefaultSearch } />
        </Router>
    </Provider>, document.querySelector("#app")
);

// Always show state for debug purposes

class UtilPanel extends React.Component {
    render() {
        return (
            <pre>{JSON.stringify(store.getState(), null, 2)}</pre>
        );
    }
}

const UpdatingUtilPanel = connect(
    (state) => state //Object.assign({}, state)
)(UtilPanel);


ReactDOM.render(
    <UpdatingUtilPanel store={store} />, document.getElementById("debug")
);
