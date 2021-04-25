import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import 'firebase/storage';  // <----
import 'firebase/firestore'

import { useFormik } from 'formik';
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
}


const Thumbnail = ({file}) => {


    const [loading, setLoading] = useState(false)
    const [thumb, setThumb] = useState()


    if (!file) { return null; }

    if (loading) { return <p>loading...</p>; }

    let reader = new FileReader();

    reader.onloadend = () => {
        setLoading(false)
        setThumb(reader.result)
    };

    reader.onerror = error => console.log(error)
    reader.onabort = abort => console.log(abort)

    console.log(file)

    reader.readAsDataURL(file);

    return (<img src={thumb}
                 alt={file.name}
                 className="img-thumbnail mt-2"
                 height={200}/>);

}

const CreateWatch = ({firebase, userId}) => {
    const textFields = ["name", "model", "year", "notes"]

    const [image, setImage] = useState()
    const [imageUUID] = useState(uuidv4())

    const upload = () => {
        // Create a root reference
        console.log("Uploading")

        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child(`images/${imageUUID}`);


        // 'file' comes from the Blob or File API
        console.log("Uploading")
        console.log(image.imageSrc)
        imageRef.put(image).then((snapshot) => {
            alert('Uploaded a blob or file!');
        });
    }

    const formik = useFormik({
        initialValues: {
            // eslint-disable-next-line no-sequences
            ...textFields.reduce((acc,curr)=> (acc[curr]='', acc),{}),
        },
        onSubmit: (values) => {
            const db = firebase.firestore();
            console.log({
                created: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: userId,
                ...values,
                imageId: imageUUID
            })

            db.collection('watches')
                .add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    createdBy: userId,
                    ...values,
                    imageId: imageUUID
                });


            // runMutation({
            //     ...values,
            //     imageId: imageUUID
            // })
        },
    });

    return (
        <div>
            <h1>Create New Watch</h1>

            <form onSubmit={formik.handleSubmit}>
                {textFields.map(fieldName =>
                    <TextField
                    fullWidth
                    key={fieldName}
                    id={fieldName}
                    name={fieldName}
                    label={fieldName.capitalize()}
                    value={formik.values[fieldName]}
                    onChange={formik.handleChange}
                    error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
                    helperText={formik.touched[fieldName] && formik.errors[fieldName]}
                    required={fieldName === 'name'}
                    multiline={fieldName === 'notes'}
                />)}

                <div style={{marginBottom: '2em'}}/>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={event => {
                            setImage(event.target.files[0])
                            formik.setFieldValue('image', event.target.files[0])
                        }}
                    />
                    <Thumbnail file={image}/>

                </div>

                <div style={{marginBottom: '2em'}}/>


                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>

                <Button color="primary" variant="contained" fullWidth onClick={()=>upload()}>
                    Upload
                </Button>

            </form>
        </div>
    )
}

export default CreateWatch