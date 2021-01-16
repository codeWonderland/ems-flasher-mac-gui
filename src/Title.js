import React from "react";
import { Link } from "react-router-dom";
import EMSFlasher from "./EMSFlasher";

export default class Title extends EMSFlasher {
    render() {
        return (
            <div>
                <Link className="back-arrow" to="/">&lt;- BACK</Link>

                <h1>ROMs on Cart:</h1>

                {this.state.bank1 === "" && this.state.bank2 === "" ?

                    <p>No data on cartridge</p> :

                    <div>
                        <p>Bank 1: {this.state.bank1}</p>
                        <p>Bank 2: {this.state.bank2}</p>
                    </div>
                }
            </div>
        );
    }
}