import React from "react";
const { ipcRenderer } = window.require('electron');

export default class EMSFlasher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bank1: "",
            bank2: "",
            currentFile: "",
            currentBank: "1",
            loading: false
        }

        // Event listeners
        // ===================

        ipcRenderer.on('cart-data', function (event, args) {
            args.split('\n').filter(line => line.startsWith('Bank')).forEach(line => {
                let value = line.split(': ')[1].trim();

                if (value === "                ") {
                    value = "Empty";
                }

                if (line.startsWith('Bank 0')) {
                    this.state.bank1 = value;

                } else if (line.startsWith('Bank 1')) {
                    this.state.bank2 = value;
                }
            })

            this.forceUpdate();
        }.bind(this));

        ipcRenderer.on('select-file', function(event, filePath) {
            this.setState({ currentFile: filePath });
        }.bind(this));

        ipcRenderer.on('rom-status', function(event, romSuccess) {
            if (romSuccess) {
                this.setState({ loading: false });
                this.forceUpdate();
            }
        }.bind(this));

        // Event triggers
        // ===================

        ipcRenderer.send('ems-flasher', '--title');

        // Function Bindings
        // ===================

        this.writeRom = this.writeRom.bind(this);
        this.downloadRom = this.downloadRom.bind(this);
        this.handleBankChange = this.handleBankChange.bind(this);
        this.saveDialog = this.saveDialog.bind(this);
    }

    openDialog() {
        ipcRenderer.send('open-file-dialog');
    }

    saveDialog() {
        let fileName = "";

        if (this.state.currentBank === "1") {
            fileName = this.state.bank1;
        } else if (this.state.currentBank === "2") {
            fileName = this.state.bank2;
        }

        ipcRenderer.send('save-file-dialog', fileName);
    }

    writeRom() {
        ipcRenderer.send('write-rom', `--bank ${this.state.currentBank} --write ${this.state.currentFile}`);

        this.setState({ loading: true });
    }

    downloadRom() {
        ipcRenderer.send('write-rom', `--bank ${this.state.currentBank} --read ${this.state.currentFile}`)

        this.setState({ loading: true });
    }

    handleBankChange(e) {
        this.setState({ currentBank: e.target.value })
    }

    renderBanks() {
        return(
            <select value={this.state.currentBank}
                    onChange={this.handleBankChange}>
                <option value="1">Slot 1: {this.state.bank1}</option>
                <option value="2">Slot 2: {this.state.bank2}</option>
            </select>
        )
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('cart-data')
        ipcRenderer.removeAllListeners('select-file')
        ipcRenderer.removeAllListeners('rom-status')
    }
}