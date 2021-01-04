import React from "react";
import { Link } from "react-router-dom";
const { ipcRenderer } = window.require('electron');

export default class ROMDownload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: ""
        }

        ipcRenderer.on('select-file', function(event, filePath) {
            this.setState({ currentFile: filePath })
        }.bind(this))
    }

    saveDialog() {
        ipcRenderer.send('save-file-dialog', 'rom');
    }

    render() {
        return (
            <div>
                <Link className="back-arrow" to="/">&lt;- BACK</Link>

                <h1>Download ROM from Cart:</h1>

                <p className="label">ROM to Download</p>
                <select name="bank">
                    {/* TODO: Dynamically pull banks */}
                    {/* TODO: Replace with "which program" and fill programs in this list by info generated from cartridge info */}
                    <option selected value="bank1">Bank 1</option>
                    <option selected value="bank2">Bank 2</option>
                </select>

                <p className="label">ROM File Destination</p>

                {this.state.currentFile !== "" ?

                    <div>
                        <p>Current ROM: {this.state.currentFile.split('/').pop()}</p>

                        <div className="flex">
                            <button className="btn" onClick={this.openDialog}>Change Destination</button>
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
}