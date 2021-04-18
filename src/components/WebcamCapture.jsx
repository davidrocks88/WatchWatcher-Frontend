import {useState, useEffect, useRef,  useCallback} from "react";
import Webcam from "react-webcam";


const WebcamCapture = ({stopWebcam}) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
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
                <img
                    src={imgSrc}
                />
            )}
        </>
    );
};

export default WebcamCapture
