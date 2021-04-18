import {useState, useEffect} from "react";

import 'react-clock/dist/Clock.css';
import {Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import exampleWatch from './example-watch.jpeg';

const Watches = () => {

    return (
        <div>
            <h1>My Watches</h1>
            <Card className="card">
                <CardActionArea>
                    <CardContent style={{padding: 0}}>
                        <CardMedia className="cardImage" image={exampleWatch} />
                        <Typography variant="h5" component="h2" style={{paddingTop: "1em", paddingBottom: "2em"}}>
                            Add New Watch
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default Watches;
