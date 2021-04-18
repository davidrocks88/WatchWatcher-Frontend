import './App.css';

// import firebase from "firebase";
import {useState, useEffect} from "react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import WebcamCapture from "./components/WebcamCapture";

require('dotenv').config()




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

function App() {

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
    <div className="App">
        <header className="App-header">Watch Watcher</header>
        <Clock value={currentTime} />
        <p>{`${currentTime.toDateString()} ${currentTime.toTimeString()} ${currentTime.getMilliseconds()}`}</p>

        <button onClick={() => setShowWebcam(!showWebcam)}>Record Time</button>
        {showWebcam && <WebcamCapture stopWebcam={()=>setShowWebcam(false)} />}
    </div>
  );
}

export default App;
