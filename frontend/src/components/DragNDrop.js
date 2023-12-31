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
                <h1>Result main screenshots</h1>
                <br />
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
                                                        <img src={thumb} alt={`${name} Thumb`} width="70" height="70" />
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