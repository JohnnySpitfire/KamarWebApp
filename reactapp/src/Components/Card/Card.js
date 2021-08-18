import React from 'react';
import './card.css';
import ImageDir from './CardImageDir';

const Card = (props) => {
    const Image = ImageDir[props.index];
    return(
        <div className="card">
            <Image className='card-image'/>
                <div className="card-text">
                    <h2>{props.title}</h2>
                </div>
        </div>
    );
}   

export default Card;