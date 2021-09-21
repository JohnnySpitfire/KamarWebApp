import React from 'react';
import './card.css';
import CardImageDir from './CardImageDir'

const Card = (props) => {
    //pairs the name props with the image index within the CardImgDir array
    const imageIndex = CardImageDir[1].findIndex(name => {return name === props.name})
    const Image = CardImageDir[0][imageIndex]
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