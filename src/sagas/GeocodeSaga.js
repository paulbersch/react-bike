/**
 * Created by paulb on 9/3/2016.
 */
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { distanceBox } from '../util/DistanceMath';

const CHICAGO_BOUNDS = new google.maps.LatLngBounds(
    {lat: 42.023135, lng: -87.940101},
    {lat: 41.644286, lng: -87.523661}
);

const updateCenter = (center) => {
    return {
        type: "UPDATE_CENTER",
        payload: {
            latLng: center
        }
    }
};

const updateBounds = (bounds) => {
    return {
        type: "UPDATE_SEARCH_BOUNDS",
        payload: {
            bounds: bounds
        }
    }
};

const doGeocode = (searchTerm, distance) => {
    var geocodeCallback, geocodeRequest, geocoder = new google.maps.Geocoder;

    var geocodeResponse = new Promise((resolve, reject) => {
        geocodeCallback = function(results, status) {
            console.log('geocodeResult', results, status);
            if (status == 'OK') {
                resolve(results[0].geometry.location);
            } else {
                reject(status);
            }
        };

        geocodeRequest = {
            address: searchTerm,
            bounds: CHICAGO_BOUNDS // anchor the search in the chicago vicinity
        };

        console.log("submitting geocode request");
        geocoder.geocode(geocodeRequest, geocodeCallback.bind(this));
    });

    return geocodeResponse.then((center) => {
        center = center.toJSON();
        console.log("in the then", center);
        let box = distanceBox(center.lat, center.lng, distance);
        let bounds = new google.maps.LatLngBounds(new google.maps.LatLng(box[0], box[1]), new google.maps.LatLng(box[2], box[3]));
        return {
            center: center,
            bounds: bounds
        }
    });
};

function* geoCode(action) {
    try {
        yield put({type: "GEOCODE_START", payload: {}});
        const results = yield call(doGeocode, action.payload.searchTerm, action.payload.distance);
        const { center, bounds } = results;
        console.log("got back center and bounds", center, bounds);
        yield put(updateBounds(bounds.toJSON()));
        console.log("update center");
        yield put(updateCenter(center));
        yield put({type: "GEOCODE_SUCCESS", payload: {}});
    } catch (e) {
        console.log(e);
        yield put({type: "GEOCODE_FAILED", message: e.message});
    }
}

export function* GeocodeSaga() {
    yield* takeLatest("UPDATE_SEARCH_TERM", geoCode);
}
