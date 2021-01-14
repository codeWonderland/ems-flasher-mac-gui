import React from "react";
import { Link } from "react-router-dom";
import EMSFlasher from "./EMSFlasher";
const { ipcRenderer } = window.require('electron');

export default class ROMDownload extends EMSFlasher {
    render() {
        return (
            <div>
                <Link className="back-arrow" to="/">&lt;- BACK</Link>

                <h1>Download ROM from Cart:</h1>

                <p className="label">ROM to Download</p>

                {this.renderBanks()}

                <p className="label">ROM File Destination</p>

                {this.state.currentFile !== "" ?

                    <div>
                        <p>Current ROM: {this.state.currentFile.split('/').pop()}</p>

                        <div className="flex">
                            <button className="btn" onClick={this.saveDialog}>Change Destination</button>
                            <button className="btn" onClick={this.writeRom}>Download ROM</button>
                        </div>
                    </div>
                    :
                    <div className="flex">
                        <button className="btn" onClick={this.openDialog}>Select Destination</button>
                    </div>
                }
            </div>
        );
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('select-file')
    }
}