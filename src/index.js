import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Write from './Write';
import ROMDownload from './ROMDownload';
import SFDownload from './SFDownload';
import Title from './Title';
import { BrowserRouter, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="App">
                <Route path="/" exact component={App} />
                <Route path="/Write" exact component={Write} />
                <Route path="/ROMDownload" exact component={ROMDownload} />
                <Route path="/SFDownload" exact component={SFDownload} />
                <Route path="/Title" exact component={Title} />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
