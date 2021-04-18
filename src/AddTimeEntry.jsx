import './App.css';

import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';  // <----

import {useState, useEffect} from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import WebcamCapture from "./components/WebcamCapture";
import {FirebaseAuthConsumer, FirebaseAuthProvider, IfFirebaseAuthed, IfFirebaseAuthedAnd} from "@react-firebase/auth";
import Button from "@material-ui/core/Button";

require('dotenv').config()

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
}


// const firebaseApp = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId
// });

// const db = firebaseApp.firestore();
//
// export { db };

function AddTimeEntry() {

    // const click = () => {
    // Add a new document in collection "cities"
    //   db.collection("cities").doc("LA").set({
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    //   })
    //       .then(function() {
    //         console.log("Document successfully written!");
    //       })
    //       .catch(function(error) {
    //         console.error("Error writing document: ", error);
    //       });
    // }

    const [currentTime, setValue] = useState(new Date());
    const [showWebcam, setShowWebcam] = useState(false)

    useEffect(() => {
        const interval = setInterval(
            () => {
                setValue(new Date())
            },
            10
        );

        return () => {
            clearInterval(interval);
        }
    }, []);




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
                            <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
                        );
                    }}
                </FirebaseAuthConsumer>
                <div>
                    <IfFirebaseAuthed>
                        {() => {
                            return <div>You are authenticated</div>;
                        }}
                    </IfFirebaseAuthed>
                    <IfFirebaseAuthedAnd
                        filter={({ providerId }) => providerId !== "anonymous"}
                    >
                        {({ providerId }) => {
                            return <div>You are authenticated with {providerId}</div>;
                        }}
                    </IfFirebaseAuthedAnd>
                </div>
            </div>
            <div className="App">
                <header className="App-header">Watch Watcher</header>
                <Clock value={currentTime}/>
                <p>{`${currentTime.toDateString()} ${currentTime.toTimeString()} ${currentTime.getMilliseconds()}`}</p>

                <button onClick={() => setShowWebcam(!showWebcam)}>Record Time</button>
                <Button variant="contained" color="primary">Add Watch</Button>
                {showWebcam &&
                <WebcamCapture firebase={firebase} getCurrentTime={() => currentTime} stopWebcam={() => setShowWebcam(false)}/>}
            </div>
        </FirebaseAuthProvider>

    );
}

export default AddTimeEntry;
