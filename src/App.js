import React from "react";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>EMS Flasher for Mac</h1>
                <Link className="btn" to="/Write">Write ROM or Save to Cartridge</Link>
                <Link className="btn" to="/Download">Download ROM or Save from Cartridge</Link>
                <Link className="btn" to="/Title">Read Information from Cartridge</Link>
            </div>
        );
    }
}