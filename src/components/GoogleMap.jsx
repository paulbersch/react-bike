import React from 'react';
import styles from '../index.css';
import { connect } from 'react-redux';

class GoogleMap extends React.Component {
    componentWillReceiveProps(nextProps) {
        console.log("gmaps got new props: ", nextProps);

        this.setState({
            latLng: nextProps.latLng,
            bounds: nextProps.bounds
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should update?", nextProps, nextState);
        if (this.state && (
            nextProps.latLng != this.state.latLng ||
            nextProps.bounds != this.state.bounds)) {
            console.log("Yes, it should update.");
            return true;
        } else {
            console.log("No, it should not update.");
            return false;
        }
    }

    componentDidMount() {
        let map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 20
        });
        this.setState({
            map: map
        });
    }

    componentDidUpdate() {
        this.state.map.fitBounds(this.state.bounds);
    }

    render() {
        return (
            <div>
                <div id="googleMap" className={styles.googleMap}>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    "use strict";
    let newState = {};

    if (state.map.latLng) {
        newState.latLng = state.map.latLng;
    }

    if (state.map.bounds) {
        newState.bounds = state.map.bounds;
    }

    console.log("gmaps updating props to: ", newState);
    return newState;
};

const mapDispatchToProps = (dispatch) => {
    "use strict";
    return {
        dispatch: dispatch
    };

};

export default connect(
    mapStateToProps
)(GoogleMap)