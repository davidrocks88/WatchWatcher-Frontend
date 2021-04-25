import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useFormik } from 'formik';
import {useState} from "react";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
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

const CreateWatch = () => {
    const textFields = ["name", "model", "year", "notes"]

    const [image, setImage] = useState()


    const formik = useFormik({
        initialValues: {
            ...textFields.reduce((acc,curr)=> (acc[curr]='', acc),{}),
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
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
            </form>
        </div>
    )
}

export default CreateWatch