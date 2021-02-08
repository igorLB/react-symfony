import React, { Component } from "react";
import RepLogs from './RepLogs';

export default class RepLogApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
        };

        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(replogid) {
        this.setState({highlightedRowId : replogid})
    }

    render() {
        const { highlightedRowId } = this.state;
        const { withHeart } = this.props;

        return (
            <RepLogs 
                withHeart={withHeart}
                highlightedRowId={highlightedRowId}
                onRowClick={this.handleRowClick}
            />
        );
    }
}
