import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

function DragDrop() {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };
    return (
        <div>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <br />
            <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}

export default DragDrop;