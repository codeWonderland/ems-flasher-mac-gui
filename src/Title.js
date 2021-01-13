import React from "react";
import { Link } from "react-router-dom";
const { ipcRenderer } = window.require('electron');

export default class Title extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bank1: "",
            bank2: ""
        }

        ipcRenderer.on('cart-data', function(event, args) {
            args.split('\n').filter(line => line.startsWith('Bank')).forEach(line => {
                if (line.startsWith('Bank 0')) {
                    this.state.bank1 = line.split(': ')[1];

                } else if (line.startsWith('Bank 1')) {
                    this.state.bank2 = line.split(': ')[1];
                }
            })
        }.bind(this))

        ipcRenderer.send('ems-flasher', '--title');
    }

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

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('cart-data')
    }
}