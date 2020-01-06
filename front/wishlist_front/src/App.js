import React from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent'
import Scene from './components/BackComponent'
import {Canvas} from 'react-three-fiber'
import ls from 'local-storage'
import MainComponent from "./components/MainComponent";

import axios from "axios";


const BACKEND_URLS = {
    signup: `/api/v1/signup/`,
    login: `/api/v1/login/`,
    uploadImage: `api/v1/upload_image`,
    wishDetail: `api/v1/wish/detail/`,
    wishList: `api/v1/wish/list/`,
};

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            authToken: ls.get('token') || null,
            userKey: ls.get('key') || null,
            currentKey: null,
        };
        console.log(props)
        const currentURL = new URL(window.location.href);
        if (currentURL.searchParams.has('token')) {
            this.auth(currentURL.searchParams.get('token'), currentURL.searchParams.get('key'));
            this.state.authToken = currentURL.searchParams.get('token');
            this.state.userKey = currentURL.searchParams.get('key');
            window.location.search = '';
        }
        if (currentURL.searchParams.has('key')) {
            this.state.currentKey = currentURL.searchParams.get('key')
        }
        if(this.state.authToken) {
            axios.defaults.headers.common['Authorization'] = `Token ${this.state.authToken}`;
        }
    }

    auth = (token, key) => {
        this.setState({'authToken': token});
        this.setState({'userKey': key});
        ls.set('token', token);
        ls.set('key', key);
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    };

    logout = () => {
        this.setState({'authToken': null});
        this.setState({'userKey': null});
        ls.remove('token');
        ls.remove('key');
        axios.defaults.headers.common['Authorization'] = ``;
    };

    render = () => {
        const loginPage = (<LoginComponent
            backend_urls={BACKEND_URLS}
            auth_callback={this.auth}
        />);
        const mainPage = (
            <MainComponent
                logoutCallback={this.logout}
                backendUrls={BACKEND_URLS}
                userKey={this.state.userKey}
                currentKey={this.state.currentKey || this.state.userKey}
            />
        );

        let currentComponent = (this.state.userKey || this.state.currentKey) ? mainPage : loginPage;

        return (
            <div className="main">
                <Canvas style={{background: '#324444'}} camera={{position: [0, 50, 10], fov: 75}}>
                    <Scene/>
                </Canvas>
                {currentComponent}
            </div>
        );
    }

}

export default App;
