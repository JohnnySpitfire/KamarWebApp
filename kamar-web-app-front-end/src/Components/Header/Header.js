import React from 'react';
import ListItem from './ListItem';
import './header.css';
import {
    Link,
  } from "react-router-dom";

const Header = () => {

    const headerListItems = [
        {
          classnames:'',
          item:'Home',
          link: '/Home'
        },
        // {
        //     classNames:'unavailable',
        //     item:'NCEA Details',
        //     link: './index.html'  
        // },
        // {
        //     classNames:'unavailable',
        //     item:'Timetable',
        //     link: './index.html'  
        // },
        {
            classNames:'',
            item:'Subject Resources',
            link: '/SubjectResources' 
        },
        {
            classNames:'',
            item:'Contact Us',
            link: '/Contact'  
        },
      ]

    const List = headerListItems.map((props, i) => {
        return (<ListItem key={headerListItems[i].key}
                          classNames={headerListItems[i].classNames}
                          item={headerListItems[i].item} 
                          link={headerListItems[i].link}/>)
    });
    return(
        <div className="nav-container">
            <div className="logo">
                <img src="" alt="logo"></img>
            </div>
                <ul className="header-links">
                  {List}
                </ul>
                <Link to='/SignIn' className='sign-in-header'>
                  <button className='sign-in-button'>
                    Sign In
                  </button>
                </Link>
        </div>
        );
}

export default Header