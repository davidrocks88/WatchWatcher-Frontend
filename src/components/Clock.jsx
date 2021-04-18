import {useState, useEffect} from "react";
import * as ReactClock from 'react-clock';
import 'react-clock/dist/Clock.css';

const Clock = () => {

    const [currentTime, setValue] = useState(new Date());

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
        <div className="Clock">
            <div>
                <ReactClock className={"clock"} value={currentTime} />
                <p>{`${currentTime.toDateString()} ${currentTime.toTimeString()} ${currentTime.getMilliseconds()}`}</p>
                <p>abc</p>
            </div>
        </div>
    );
};

export default Clock;
