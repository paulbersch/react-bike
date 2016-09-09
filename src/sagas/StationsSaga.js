/**
 * Created by paulb on 9/4/2016.
 */
import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import 'whatwg-fetch';


const queryStations = (bounds) => {
    console.log("the bounds are: ", bounds);
    const boundsObj = new google.maps.LatLngBounds(
        { lat: bounds.south, lng: bounds.west },
        { lat: bounds.north, lng: bounds.east }
    );

    console.log("the bounds are: ", bounds, boundsObj);

    return fetch('https://oc.tl/proxy/divvy-api/')
        .then((response) => {
            return response.json();
        }).then((json) => {
            console.log('stations feed', json);
            return json.stationBeanList.filter((station) => {
                return boundsObj.contains({
                    lat: station.latitude,
                    lng: station.longitude
                });
            });
        }).then((stations) => {
            console.log('filtered stations', stations);
            return stations;
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
};

function* getStations(action) {
    try {
        yield put({type: "STATION_SEARCH_START", payload: {}});
        const results = yield call(queryStations, action.payload.bounds);
        yield put({type: "UPDATE_STATIONS", payload: { stations: results }});
        yield put({type: "STATION_SEARCH_SUCCESS", payload: {}});
    } catch (e) {
        yield put({type: "STATION_SEARCH_FAIL", payload: {}});
    }
}

export function* StationsSaga() {
    yield* takeLatest("UPDATE_SEARCH_BOUNDS", getStations);
}
