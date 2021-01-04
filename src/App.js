import React from "react";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>EMS Flasher for Mac</h1>
                <Link className="btn" to="/Write">Write ROM to the cart</Link>
                <Link className="btn" to="/ROMDownload">Download ROM from cart</Link>
                <Link className="btn" to="/SFDownload">Download ROMDownload File from cart</Link>
                <Link className="btn" to="/Title">Print out cart info</Link>
            </div>
        );
    }
}