import React, {useRef, useState, useEffect} from "react";
import { Button } from 'reactstrap';

const FileUploader = (props) => {

    const fileInput = useRef(null)    
    const [thumbnail,setThumbnail]=useState('');

    useEffect(() => {
        //onFileSelect(thumbnail);
    }, [thumbnail])

    return (

    <>
        <input type="file" className="display-none" ref={fileInput} onChange={evt => props.onFileSelect(evt.target.files[0])}/>
    <Button onClick={evt => fileInput.current && fileInput.current.click()} className="btn btn-primary" size="sm">{props.btnText}</Button>
    </>
    )
}

export default FileUploader;