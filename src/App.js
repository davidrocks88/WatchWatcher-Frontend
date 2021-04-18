import './App.css';

import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';  // <----

import {useState, useEffect} from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import WebcamCapture from "./components/WebcamCapture";
import {FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd} from "@react-firebase/auth";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import {Menu, MenuItem} from "@material-ui/core";
import Watches from "./components/Watches";
require('dotenv').config()

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
}


function App() {
    return (
        <FirebaseAuthProvider firebase={firebase} {...config}>
            <div>
                <button
                    onClick={() => {
                        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(googleAuthProvider);
                    }}
                >
                    Sign In with Google
                </button>
                <button
                    data-testid="signin-anon"
                    onClick={() => {
                        firebase.auth().signInAnonymously();
                    }}
                >
                    Sign In Anonymously
                </button>
                <button
                    onClick={() => {
                        firebase.auth().signOut();
                    }}
                >
                    Sign Out
                </button>

                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                        return (
                            <div style={{flexGrow: 1}}>
                            <AppBar position="static" >
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h6">
                                        Watch Watcher
                                    </Typography>

                                    {!isSignedIn && <Button color="inherit">Login</Button>}
                                    {isSignedIn && (
                                        <div style={{position: "relative", marginLeft: 100}}>
                                            <Typography style={{flexGrow: 1}} variant="h6">
                                                Welcome {user.providerData[0].displayName}
                                            </Typography>
                                        </div>
                                    )}

                                </Toolbar>
                            </AppBar>
                            </div>);
                    }}

                </FirebaseAuthConsumer>
            </div>
            <div className="App">
                <Watches />
            </div>
        </FirebaseAuthProvider>

    );
}

export default App;
