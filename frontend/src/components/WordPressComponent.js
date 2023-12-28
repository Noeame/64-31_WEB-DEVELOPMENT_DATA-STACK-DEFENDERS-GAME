import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const WordPressComponent = () => {
    const [posts, setPosts] = useState([]);

    const { id } = useParams();

    const fetchWordPressData = async () => {
        try {
            const response = await axios.get('https://localhost/wordpress/wp-json/wp/v2/pages');

            const data = setPosts(response.data);
            console.log(response.data);

            // Faites quelque chose avec les données récupérées
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWordPressData();
    }, []);

    return (
        <div>{
            Object.keys(posts).length ?
                posts.map((post) => {
                    if (post.title.rendered === `${id}`)
                        return <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                }
                ) : 'Loading ....'

        }</div>
    );
};

export default WordPressComponent;


