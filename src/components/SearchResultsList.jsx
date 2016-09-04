/**
 * Created by paulb on 9/3/2016.
 */
import 'whatwg-fetch';
import React from "react";
import { connect } from 'react-redux';

class SearchResultsList extends React.Component {

    render(){};
}

const mapStateToProps = (state) => {
    "use strict";
    let newState = {};

    if (state.map.latLng) {
        newState.latLng = state.map.latLng;
    }

    if (state.panel.searchTerm) {
        newState.searchTerm = state.panel.searchTerm;
    }

    if (state.panel.distance) {
        newState.distance = state.panel.distance;
    }

    console.log("gmaps updating props to: ", newState);
    return newState;
}

export default connect(
    mapStateToProps
)(SearchResultsList);
