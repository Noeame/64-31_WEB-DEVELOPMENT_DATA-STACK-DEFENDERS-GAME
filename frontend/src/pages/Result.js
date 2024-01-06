import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import BackgroundImage from '../components/BackgroundImage';
import DragDrop from '../components/DragDrop';
import { useFormik } from 'formik';
import Dropzone from '../components/Dropzone';

import { FileUploader } from "react-drag-drop-files";
import DragNDrop from '../components/DragNDrop';

const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

const Result = () => {

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };



    const [posts, setPosts] = useState([]);
    const user = localStorage.getItem('admin');

    const formik = useFormik({

    })


    const fetchWordPressData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/posts`);

            const data = setPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWordPressData();
    }, []);


    return (
        <div>
            <BackgroundImage />
            <Navigation />
            <DragNDrop />
            <div>{
                Object.keys(posts).length ?
                    posts.map((post) => {
                        if (post.title.rendered === 'Result')
                            return <div key={post.id}>
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            </div>
                    }
                    ) : 'Loading ....'

            }</div>
            <DragDrop />
        </div>
    );
};

export default Result;