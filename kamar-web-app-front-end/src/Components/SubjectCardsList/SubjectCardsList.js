import React from 'react';
import Card from '../Card/Card';
import {
    Link,
  } from "react-router-dom";

const SubjectCardsList = (props) => {
    //default subject card list based on subjects present on the database
    const CardList = (propsParent) => {
        const { subjectList } = propsParent;
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
    //returns a subject card list with the names which are present on the users subject array present on their users table entry 
    const UserCardList = (propsParent) => {
        const { subjectList } = propsParent;
        const userCardList = subjectList.filter((subject)=>{
            return propsParent.userSubjects.includes(subject.name)
        })
        return (
            userCardList.map((props, i) => {
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
                {/* if the userlevel === 0 then only display the default subject cards as the user has not signed in*/}
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
export default SubjectCardsList;    