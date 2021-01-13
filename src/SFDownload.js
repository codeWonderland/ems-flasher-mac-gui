import React from "react";
import { Link } from "react-router-dom";

export default class SFDownload extends React.Component {
    render() {
        return (
            <div>
                <h1>This is my profile</h1>
                <Link to="/">Go back to home</Link>
            </div>
        );
    }
}