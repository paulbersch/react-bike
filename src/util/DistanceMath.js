// utility functions (mostly for calculating geographic distance)

const milesPerNauticalMile = 1.15078, rad = Math.PI / 180.0;

// computes the NW and SE corners of a square box that completely
// encloses a circle for fast filtering of locations within
// a certain radius
export function distanceBox(lat, lng, radius) {
    console.log(lat, lng, radius)
    var latR = radius / (milesPerNauticalMile * 60.0);
    var lngR = radius / (Math.cos(lat * rad) * milesPerNauticalMile * 60.0);

    return [lat - latR, lng - lngR, lat + latR, lng + lngR];
}

export function boxContainsPoint(box, lat, lng) {
    // assumes order of points is same as returned by util.distanceBox
    // also only works in NW hemisphere
    return (lat < box[0] &&
        lng > box[1] &&
        lat > box[2] &&
        lng < box[3]
    );
}

var R = 3963; // radius of earth in miles

export function distance(lat1, lng1, lat2, lng2) {
    // convert from degress to radians
    lat1 = lat1 * rad;
    lat2 = lat2 * rad;
    lng1 = lng1 * rad;
    lng2 = lng2 * rad;

    return Math.acos(Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.cos(lng2 - lng1)) * R;
}

export function pointsWithinDistance(lat1, lng1, lat2, lng2, dist) {
    return distance(lat1, lng1, lat2, lng2) <= dist;
}

