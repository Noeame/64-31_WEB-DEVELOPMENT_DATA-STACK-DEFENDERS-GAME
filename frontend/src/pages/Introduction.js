import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundImage from '../components/BackgroundImage';
import Navigation from '../components/Navigation';

// declaration de classe
const Introduction = () => {
    const [posts, setPosts] = useState([]);

    const fetchWordPressData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/pages`);

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

    // On parcourt tous les id de pages et pour l'id ayant pour titre "Introduction", on récupère son code html brute qu'on insère dans la balise <div>

    return (
        <div id='introduction'>
            <BackgroundImage />
            <Navigation />
            <div>{
                Object.keys(posts).length ?
                    posts.map((post) => {
                        if (post.title.rendered === 'Introduction')
                            return <div key={post.id}>
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            </div>
                    }
                    ) : 'Loading ....'

            }</div>
        </div>
    );
};

export default Introduction;