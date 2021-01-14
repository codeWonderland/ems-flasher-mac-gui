import React from "react";
import { Link } from "react-router-dom";
import EMSFlasher from "./EMSFlasher";

export default class Write extends EMSFlasher {
    render() {
        return (
            this.state.loading ?
                <h1>
                    Loading...
                </h1> :

                <div>
                    <Link className="back-arrow"
                          to="/">&lt;- BACK</Link>
                    <h1>Write ROM to Cart</h1>

                    <p className="label">Select slot on cartridge to write to</p>

                    {this.renderBanks()}

                    <p className="label">Select ROM or Save (.sav) to Write</p>
                    {this.state.currentFile !== "" ?

                        <div className="flex">
                            <button className="btn"
                                    onClick={this.openDialog}>{this.state.currentFile.split('/').pop()}</button>
                            <button className="btn"
                                    onClick={this.writeRom}>Write file to Cartridge
                            </button>
                        </div>
                        :
                        <div className="flex">
                            <button className="btn"
                                    onClick={this.openDialog}>Choose ROM
                            </button>
                        </div>
                    }

                </div>

        );
    }
}