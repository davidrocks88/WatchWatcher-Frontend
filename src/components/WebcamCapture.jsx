import {useState, useEffect, useRef,  useCallback} from "react";
import Webcam from "react-webcam";


const WebcamCapture = ({getCurrentTime,stopWebcam}) => {
    const webcamRef = useRef(null);


    const [imgSrc, setImgSrc] = useState(null);


    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc({
            imageSrc,
            time: getCurrentTime()
        });
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            <button onClick={stopWebcam}>Cancel</button>
            {imgSrc && (
                <>
                <img
                    src={imgSrc.imageSrc}
                />
                    <p>{`${imgSrc.time.toDateString()} ${imgSrc.time.toTimeString()} ${imgSrc.time.getMilliseconds()}`}</p>
                </>
            )}
        </>
    );
};

export default WebcamCapture
