import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*** action creators ***/
const updateSearch = (searchTerm, distance) => {
    return {
        type: "UPDATE_SEARCH_TERM",
        payload: {
            searchTerm: searchTerm,
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
        this.props.dispatch(updateSearch(this.state.searchTerm, this.state.distance));
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
        this.props.dispatch(updateSearch(this.state.searchTerm, event.target.value));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(updateSearch(this.state.searchTerm, this.state.distance));
        return false;
    };

    handleClear = (event) => {
        event.preventDefault();
        this.props.dispatch(updateSearch("Chicago, IL", 8));
        return false;
    };

    render() {
        return (
            <div className="search-panel">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search-location">Location:</label><input id="search-location" name="search-location" value={this.state.searchTerm} onChange={this.handleLocationChange}/>
                    <select onChange={this.handleDistanceChange} value={this.state.distance}>
                        <option value={0.25}>0.25mi</option>
                        <option value={0.50}>0.50mi</option>
                        <option value={1}>1.00mi</option>
                        <option value={2}>2.00mi</option>
                        <option value={3}>3.00mi</option>
                        <option value={5}>5.00mi</option>
                        <option value={8}>8.00mi</option>
                        <option value={13}>13.00mi</option>
                    </select>
                    <input type="submit" name="search-button" value="Search" />
                    <input type="submit" name="clear-button" value="Clear" onClick={this.handleClear}/>
                    <pre>State:{JSON.stringify(this.state, null, 2)}</pre>
                    <pre>Props:{JSON.stringify(this.props, null, 2)}</pre>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    "use strict";
    let newState = {};

    /*
    if (state.panel.searchTerm) {
        newState.searchTerm = state.panel.searchTerm;
    }

    if (state.panel.distance) {
        newState.distance = state.panel.distance;
    }
    */

    console.log("updating searchpanel props to: ", newState);
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

