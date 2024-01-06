import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




const webDevelopperCharacters = [
    {
        id: 'bloc',
        name: 'block',
        thumb: 'images/game-block/block.png'
    },
    {
        id: 'block2',
        name: 'block 2',
        thumb: 'images/game-block/block2.png'
    },
    {
        id: 'pageLeft',
        name: 'PageLeft',
        thumb: '/images/game-block/PageLeft.png'
    },
    {
        id: 'pageRight',
        name: 'PageRight',
        thumb: '/images/game-block/PageRight.png'
    },
    {
        id: 'background',
        name: 'Background',
        thumb: '/images/game-block/Background.png'
    },
    {
        id: 'gameOver',
        name: 'GameOver',
        thumb: '/images/game-block/gameOver.png'
    },
    {
        id: 'playButton1',
        name: 'Play button',
        thumb: '/images/game-bonus/playButton1.png'
    },
    {
        id: 'leaderboardbutton',
        name: 'Score',
        thumb: '/images/game-bonus/leaderboardbutton.png'
    },
    {
        id: 'home',
        name: 'Home',
        thumb: '/images/game-bonus/home.png'
    },
    {
        id: 'arcticbg',
        name: 'arcticbg',
        thumb: '/images/game-bonus/arcticbg.png'
    },
    {
        id: 'desert',
        name: 'desert',
        thumb: '/images/game-bonus/desert.png'
    },
    {
        id: 'forestbg',
        name: 'forestbg',
        thumb: '/images/game-bonus/forestbg.png'
    },
    {
        id: 'jeuImage',
        name: 'jeuImage',
        thumb: '/images/game-bonus/jeuImage.png'
    }
]

const DragNDrop = () => {
    const [characters, updateCharacters] = useState(webDevelopperCharacters);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    return (

        <div className="App">
            <header className="dragndrop-header">
                <h1>The Initial Designs of Eco Guard Hero</h1>
                <br />
                <div className='textDiv'>
                    Welcome to the early stages of "Eco Guard Hero" In this space, we share the evolving concepts and visual ideas that shape our game.

                    Before a game fully materializes, it begins as imagination taking form. Here, you'll see the transformation from initial sketches and early designs. These visuals represent the core of what "Eco Guard Hero" aims to become a captivating and immersive gaming experience.

                    Join us in glimpsing into our creative process, understanding our inspirations, and sharing in the excitement for what lies ahead. As these designs evolve into the final game, we invite you to celebrate each milestone with us.
                </div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {characters.map(({ id, name, thumb }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="characters-thumb">
                                                        <img src={thumb} alt={`${name} Thumb`} width="200" height="200" />
                                                    </div>
                                                    <p>
                                                        {name}
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </header>
        </div>
    );
}


export default DragNDrop;