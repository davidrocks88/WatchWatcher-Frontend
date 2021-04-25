import {useState, useEffect, useRef,  useCallback} from "react";
import Webcam from "react-webcam";
// import { getStorage, ref, uploadBytes } from "firebase/storage";


const WebcamCapture = ({firebase, getCurrentTime,stopWebcam}) => {
    const webcamRef = useRef(null);


    const [imgSrc, setImgSrc] = useState(null);


    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log({imageSrc})
        setImgSrc({
            imageSrc,
            time: getCurrentTime()
        });
        // stopWebcam()
    }, [webcamRef, setImgSrc]);

    const upload = () => {
        // Create a root reference
        console.log("Uploading")

        var storageRef = firebase.storage().ref();
        var mountainsRef = storageRef.child('mountains.jpg');


            // 'file' comes from the Blob or File API
        console.log("Uploading")
        console.log(imgSrc.imageSrc)
        mountainsRef.putString(imgSrc.imageSrc, 'data_url').then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }

    return (
        <div className='webcam'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            <button onClick={stopWebcam}>Cancel</button>
            <button onClick={upload}>Upload</button>
            {imgSrc && (
                <>
                <img
                    src={imgSrc.imageSrc}
                />
                    <p>{`${imgSrc.time.toDateString()} ${imgSrc.time.toTimeString()} ${imgSrc.time.getMilliseconds()}`}</p>
                </>
            )}
            {/*<p>{JSON.stringify(imgSrc)}</p>*/}
        </div>
    );
};

export default WebcamCapture
