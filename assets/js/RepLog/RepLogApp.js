import React, { Component } from "react";

export default class RepLogApp extends Component {
    render() {

        let heart = '';

        if (this.props.withHeart) {
            heart = <span>Coração!</span>
        }

        return (
            <h2>Lift With JSX! {heart}</h2>
        );
    }
}
