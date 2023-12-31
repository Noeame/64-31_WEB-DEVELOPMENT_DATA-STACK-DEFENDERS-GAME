import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import BackgroundImage from '../components/BackgroundImage';

const Logbook = () => {
    const [posts, setPosts] = useState([]);

    const fetchWordPressData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/pages`);
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
                        if (post.title.rendered === 'Logbook')
                            return <div key={post.id}>
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            </div>
                    }
                    ) : 'Loading ....'

            }</div>
        </div>
    );
};

export default Logbook;