import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, dispatch, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { Panel } from './components/Panel';

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
        case 'UPDATE_SEARCH_TERM':
            console.log(state, action);
            return Object.assign({}, state, {
                searchTerm: action.payload.searchTerm
            });
        case 'UPDATE_DISTANCE':
            console.log(state, action);
            return Object.assign({}, state, {
                distance: action.payload.distance
            });
        case 'CREATE_SEARCH_RESULT':
            return state;
        default:
            return state;
    }
}
const initalState = {
};

const store = createStore(
    combineReducers({ panel: panelReducer, map: gMapReducer}),
    initalState
);

class PanelWithDefaultSearch extends React.Component {
    render() {
        return (
            <Panel searchTerm="Default" distance={2} />
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
