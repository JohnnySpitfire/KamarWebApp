import React from 'react';
import Card from '../Card/Card';


const SubjectCards = (subjectList) => {
    const cardList = subjectList.map((props, i) => {
        return (<Card id={subjectList[i].id}
                     name={subjectList[i].name} 
                     title={subjectList[i].title} 
                     description={subjectList[i].description}
                     index={i}/>)
    })
    return (
        <div className='card-wrapper-resources'>
              {cardList}
        </div>
    );
}
export default SubjectCards;    