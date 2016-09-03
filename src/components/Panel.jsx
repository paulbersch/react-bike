import 'whatwg-fetch';
import React from "react";
import GoogleMap from '../components/GoogleMap';
import SearchPanel from '../components/SearchPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ResultsList extends React.Component {
    render() {
        return (
            <div className="results-list">
                <h2>Results</h2>
                <ol>
                </ol>
            </div>
        )
    }
}

class DirectionsPanel extends React.Component {
    render() {

    }
}

class AboutPanel extends React.Component {
    render() {

    }
}

export class Panel extends React.Component {
    componentWillMount() {
    }

    loadDataFromJson() {
        fetch('data.json')
            .then(function(response) {
                return response.json()
            });
    }

    render() {
        return (
            <div id="panel">
                <SearchPanel searchTerm={this.props.searchTerm || this.props.params.searchTerm} distance={this.props.distance || this.props.params.distance} />
                <ResultsList/>
                <GoogleMap searchTerm={this.props.searchTerm || this.props.params.searchTerm} distance={this.props.distance || this.props.params.distance} />
            </div>
        )
    }
}

