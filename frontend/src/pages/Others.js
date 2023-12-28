import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import BackgroundImage from '../components/BackgroundImage';
import DragDrop from '../components/DragDrop';

const Others = () => {
    const [posts, setPosts] = useState([]);

    const fetchWordPressData = async () => {
        try {
            const response = await axios.get('https://localhost/wordpress/wp-json/wp/v2/pages');

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
            <div>{
                Object.keys(posts).length ?
                    posts.map((post) => {
                        if (post.title.rendered === 'Others')
                            return <div key={post.id}>
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            </div>
                    }
                    ) : 'Loading ....'

            }</div>


        </div>
    );
};

export default Others;