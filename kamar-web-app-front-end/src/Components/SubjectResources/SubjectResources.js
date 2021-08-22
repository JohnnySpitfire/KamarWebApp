import React from 'react';
import SubjectCards from '../SubjectCards/SubjectCards';
import './subject-resources.css'
import { subjectList } from '../../SubjectList'
import SearchBar from '../SearchBar/SearchBar'
import Header from '../Header/Header';

const SubjectResources = () => {
    
    return (
        <div>
            <Header/>
            <div className='main-container-resources'>
              <SearchBar/>
                {SubjectCards(subjectList)}
            </div>
        </div>
    );
}

export default SubjectResources;