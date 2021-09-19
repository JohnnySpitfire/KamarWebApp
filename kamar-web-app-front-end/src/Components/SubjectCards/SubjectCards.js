import React from 'react';
import Card from '../Card/Card';
import {
    Link,
  } from "react-router-dom";

const SubjectCards = (props) => {
    
console.log('subjectcards', props);

    const CardList = (propsParent) => {
        const {subjectList} = propsParent;
        return (
            subjectList.map((props, i) => {
                return(
                    <Link onClick={() => propsParent.setSubject(subjectList[i].name)} to={`/SubjectResources/${propsParent.userLevel}/${subjectList[i].name}`}>
                        <Card
                            key={subjectList[i].id}
                            name={subjectList[i].name} 
                            title={subjectList[i].title} 
                        />
                    </Link>
                )
            })
        )
    }
    const UserCardList = (propsParent) => {
        console.log('propsParent', props)   
        const { subjectList } = propsParent;

        const userCardList = subjectList.filter((subject)=>{
            return propsParent.userSubjects.includes(subject.name)
        })
        return (
            userCardList.map((props, i) => {
                console.log(userCardList)
            return(
                    <Link onClick={() => propsParent.setSubject(userCardList[i].name)} to={`/SubjectResources/${propsParent.userLevel}/${userCardList[i].name}`}>
                        <Card
                            key={userCardList[i].id}
                            name={userCardList[i].name} 
                            title={userCardList[i].title} 
                        />
                    </Link>
                )
            })
        )
    }
        return (
            <React.Fragment>
                {props.isSearching?
                <div className='card-resources'>    
                    <CardList subjectList={props.subjectList} setSubject={props.setSubject} userLevel={props.userLevel}/>
                </div>:
                <div className='card-wrapper-resources'>    
                {props.userLevel !== 0?
                    <div className='card-resources'>
                        <UserCardList subjectList={props.subjectList} setSubject={props.setSubject} userLevel={props.userLevel} userSubjects={props.userSubjects}/>
                    </div>:
                    <React.Fragment></React.Fragment>}
                    <div className='card-resources'>
                        <CardList subjectList={props.subjectList} setSubject={props.setSubject} userLevel={props.userLevel}/>
                    </div>
                </div>}
            </React.Fragment>
        );  
}
export default SubjectCards;    