import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useFormik } from 'formik';
import {useState} from "react";

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

// const Thumbnail = ({file}) => {
//
//
//     const [loading, setLoading] = useState(false)
//     const [thumb, setThumb] = useState()
//
//
//     if (!file) { return null; }
//
//     if (loading) { return <p>loading...</p>; }
//
//     this.setState({ loading: true }, () => {
//         let reader = new FileReader();
//
//         reader.onloadend = () => {
//             this.setState({ loading: false, thumb: reader.result });
//         };
//
//         reader.readAsDataURL(nextProps.file);
//     });
//
//     return (<img src={thumb}
//                  alt={file.name}
//                  className="img-thumbnail mt-2"
//                  height={200}
//                  width={200} />);
//
// }

const CreateWatch = () => {
    const textFieldsArr = ["name", "model", "year", "notes"]
    const textFields = textFieldsArr.reduce((acc,curr)=> (acc[curr]='', acc),{});


    const formik = useFormik({
        initialValues: {
            ...textFields,
            file: null
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h1>Create New Watch</h1>

            <form onSubmit={formik.handleSubmit}>
                {textFieldsArr.map(fieldName =>
                    <TextField
                    fullWidth
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

                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateWatch