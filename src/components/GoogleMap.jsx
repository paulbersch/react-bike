import React from 'react';
import styles from '../index.css';
import { connect } from 'react-redux'

const CHICAGO_BOUNDS = new google.maps.LatLngBounds(
    {lat: 42.023135, lng: -87.940101},
    {lat: 41.644286, lng: -87.523661}
);

/*** action creators ***/
const updateCenter = (center) => {
    return {
        type: "UPDATE_CENTER",
        payload: {
            latLng: center
        }
    }
};

class GoogleMap extends React.Component {
    init() {
        let map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
        this.setState({
            map: map
        });
    }

    geocode(searchTerm) {
        var geocodeCallback, geocodeRequest, geocoder = new google.maps.Geocoder;

        geocodeCallback = function(results, status) {
            console.log('geocodeResult', results, status);
            if (status == 'OK') {
                this.props.dispatch(updateCenter(results[0].geometry.location.toJSON()));
            };
        };

        geocodeCallback = geocodeCallback.bind(this);

        geocodeRequest = {
            address: searchTerm,
            bounds: CHICAGO_BOUNDS
        };
        console.log('geocodeRequest', geocodeRequest);

        geocoder.geocode(geocodeRequest, geocodeCallback);
    }

    componentWillReceiveProps(nextProps) {
        console.log("gmaps got new props: ", nextProps);

        if (nextProps.searchTerm) {
            this.setState({
                searchTerm: nextProps.searchTerm
            });
        }

        if (nextProps.latLng) {
            this.setState({
                searchTerm: nextProps.searchTerm
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should update?", nextProps, nextState);
        if (this.state && (nextProps.searchTerm != this.state.searchTerm ||
            nextProps.latLng != this.state.latLng)) {
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Will update.", nextProps, nextState);
        if (this.state && nextState.searchTerm != this.state.searchTerm) {
            this.geocode(nextState.searchTerm);
        } else if (nextProps.latLng != this.state.latLng) {
            this.state.map.setCenter(nextProps.latLng)
        }
    }

    componentDidMount() {
        this.init();
        this.geocode(this.props.searchTerm);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div id="googleMap" className={styles.googleMap}>
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

    if (state.panel.searchTerm) {
        newState.searchTerm = state.panel.searchTerm;
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