import React from "react";
import { Link } from "react-router-dom";
const { ipcRenderer } = window.require('electron');

export default class Write extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: ""
        }

        ipcRenderer.on('select-file', function(event, filePath) {
            this.setState({ currentFile: filePath })
        }.bind(this))
    }

    openDialog() {
        ipcRenderer.send('open-file-dialog', 'write');
    }

    writeRom() {
        console.log('writing ROM');
    }

    render() {
        return (
            <div>
                <Link className="back-arrow" to="/">&lt;- BACK</Link>
                <h1>Write ROM to Cart:</h1>

                {this.state.currentFile !== "" ?

                    <div>
                        <p>Current ROM: {this.state.currentFile.split('/').pop()}</p>

                        <div className="flex">
                            <button className="btn" onClick={this.openDialog}>Change ROM</button>
                            <button className="btn" onClick={this.writeRom}>Write ROM to Cart</button>
                        </div>
                    </div>
                    :
                    <div className="flex">
                        <button className="btn" onClick={this.openDialog}>Choose ROM</button>
                    </div>
                }

            </div>
        );
    }
}