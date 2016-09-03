import 'whatwg-fetch';
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*** action creators ***/
const updateSearchTerm = (searchTerm) => {
    return {
        type: "UPDATE_SEARCH_TERM",
        payload: {
            searchTerm: searchTerm
        }
    }
};

const updateDistance = (distance) => {
    return {
        type: "UPDATE_DISTANCE",
        payload: {
            distance: distance
        }
    }
};

class SearchPanel extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        console.log("componentwillmount");
        this.state = {
            searchTerm: this.props.searchTerm,
            distance: this.props.distance
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("got new props: ", nextProps);
        this.setState(nextProps);
    }

    componentDidMount() {
    }

    handleLocationChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    handleDistanceChange = (event) => {
        this.setState({
            distance: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(updateSearchTerm(this.state.searchTerm));
        this.props.dispatch(updateDistance(this.state.distance));
        console.log("submitted events");
        return false;
    };

    handleClear = (event) => {
        event.preventDefault();
        this.props.dispatch(updateSearchTerm("Chicago, IL"));
        this.props.dispatch(updateDistance(8));
        console.log("reset form");
        return false;
    };

    render() {
        console.log("Rendering search panel.");
        return (
            <div className="search-panel">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search-location">Location:</label><input id="search-location" name="search-location" value={this.state.searchTerm} onChange={this.handleLocationChange}/>
                    <select onChange={this.handleDistanceChange}>
                        <option value="0.25">0.25mi</option>
                        <option value="0.50">0.50mi</option>
                        <option value="1.00">1.00mi</option>
                        <option value="2.00">2.00mi</option>
                        <option value="3.00">3.00mi</option>
                        <option value="4.00">4.00mi</option>
                        <option value="5.00">5.00mi</option>
                    </select>
                    <input type="submit" name="search-button" value="Search" />
                    <input type="submit" name="clear-button" value="Clear" onClick={this.handleClear}/>
                    <input type="text" value={this.state.searchTerm} readOnly="readOnly" />
                    <input type="text" value={this.props.searchTerm} readOnly="readOnly" />
                    <input type="text" value={this.state.distance} readOnly="readOnly" />
                    <input type="text" value={this.props.distance} readOnly="readOnly" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    "use strict";
    let newState = {};

    if (state.panel.searchTerm) {
        newState.searchTerm = state.panel.searchTerm;
    }

    if (state.panel.distance) {
        newState.distance = state.panel.distance;
    }

    console.log("updating props to: ", newState);
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
)(SearchPanel);

